import CarInfo from '../../../interfaces/CarInfo';
import StartCarParams from '../../../interfaces/StartCarParams';

export default class HttpClient {
  private static client = new HttpClient();

  public static getInstance() {
    return this.client;
  }

  public async getCars(page: number): Promise<[CarInfo[], string | null]> {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage?_page=${page}&_limit=7`);
      const totalCount = response.headers.get('X-Total-Count');
      const data = await response.json();
      return [data, totalCount];
    } catch (error) {
      throw new Error(`Getting cars error, ${error}`);
    }
  }

  public async engineControl(id: number, status: 'started' | 'stopped'): Promise<StartCarParams> {
    try {
      const res = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=${status}`, {
        method: 'PATCH',
      });
      const data = await res.json();
      return data;
    } catch (error) {
      throw Error(`Incorrect ID: ${error}`);
    }
  }

  public async startCar(id: number, controller: AbortController) {
    const res = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, {
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
    await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: 'DELETE',
    });
  }

  public async createCar(name: string, color: string) {
    await fetch(`http://127.0.0.1:3000/garage`, {
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
    await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: 'DELETE',
    });
  }

  public async updateCar({ id, name, color }: CarInfo) {
    const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
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

  // public async createWinner(winner: WinnerInfo) {
  //   await fetch(`http://127.0.0.1:3000/winners`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id: winner.id,
  //       wins: 1,
  //       time: winner.time,
  //     }),
  //   });
  // }
}
