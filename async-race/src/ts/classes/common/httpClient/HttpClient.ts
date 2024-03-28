import CarInfo from '../../../interfaces/CarInfo';
import StartCarParams from '../../../interfaces/StartCarParams';
import WinnerInfo from '../../../interfaces/WinnerInfo';
import { WinnersOrder } from '../../../types/WinnersOrder';
import { WinnersSort } from '../../../types/WinnersSort';

export default class HttpClient {
  private static client = new HttpClient();

  private url: string = 'http://127.0.0.1:3000';

  public static getInstance() {
    return this.client;
  }

  public async getCars(page: number): Promise<[CarInfo[], string | null]> {
    try {
      const response = await fetch(`${this.url}/garage?_page=${page}&_limit=7`);
      const totalCount = response.headers.get('X-Total-Count');
      const data = await response.json();
      return [data, totalCount];
    } catch (error) {
      throw new Error(`Getting cars error, ${error}`);
    }
  }

  public async getOneCar(id: CarInfo['id']): Promise<CarInfo> {
    try {
      const response = await fetch(`${this.url}/garage/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Car doesn't exist, ${error}`);
    }
  }

  public async engineControl(id: number, status: 'started' | 'stopped'): Promise<StartCarParams> {
    try {
      const res = await fetch(`${this.url}/engine?id=${id}&status=${status}`, {
        method: 'PATCH',
      });
      const data = await res.json();
      return data;
    } catch (error) {
      throw Error(`Incorrect ID: ${error}`);
    }
  }

  public async startCar(id: number, controller: AbortController) {
    const res = await fetch(`${this.url}/engine?id=${id}&status=drive`, {
      method: 'PATCH',
      signal: controller.signal,
    });
    return res;
    // try {
    // } catch (err) {
    //   throw new Error(`Car #${id} was stopped`);
    // }
  }

  public async deleteCar(id: number) {
    await fetch(`${this.url}/garage/${id}`, {
      method: 'DELETE',
    });
    this.deleteCarFromWinnersList(id);
  }

  public async createCar(name: string, color: string) {
    await fetch(`${this.url}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        color,
      }),
    });
  }

  public async deleteCarFromWinnersList(id: number) {
    await fetch(`${this.url}/winners/${id}`, {
      method: 'DELETE',
    });
  }

  public async updateCar({ id, name, color }: CarInfo) {
    const response = await fetch(`${this.url}/garage/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        color,
      }),
    });
    return response;
  }

  public async saveWinner({ id, time }: Omit<WinnerInfo, 'wins'>) {
    const winner = await this.getWinner(id);
    if (winner) {
      await this.updateWinner({ id, time }, winner);
      return;
    }
    await fetch(`${this.url}/winners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        wins: 1,
        time,
      }),
    });
  }

  public async getWinner(id: WinnerInfo['id']): Promise<WinnerInfo | null> {
    try {
      const resp = await fetch(`${this.url}/winners/${id}`);
      if (resp.status === 404) return null;
      const data = await resp.json();
      return data;
    } catch {
      return null;
    }
  }

  public async updateWinner(newResult: Omit<WinnerInfo, 'wins'>, prevResult: WinnerInfo) {
    const wins = prevResult.wins + 1;
    const time = Math.min(newResult.time, prevResult.time);
    await fetch(`${this.url}/winners/${newResult.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wins,
        time,
      }),
    });
  }

  public async getWinnersList(
    page: number = 1,
    sort: WinnersSort = 'id',
    order: WinnersOrder = 'ASC'
  ): Promise<[WinnerInfo[], string | null]> {
    const resp = await fetch(`http://127.0.0.1:3000/winners?_page=${page}&_limit=10&_sort=${sort}&_order=${order}`);
    const totalCount = resp.headers.get('X-Total-Count');
    const data = await resp.json();
    return [data, totalCount];
  }
}
