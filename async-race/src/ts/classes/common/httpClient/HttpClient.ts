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

  public async toDrive(id: number): Promise<StartCarParams> {
    try {
      const res = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, {
        method: 'PATCH',
      });
      const data = await res.json();
      return data;
    } catch (error) {
      throw Error(`Incorrect ID: ${error}`);
    }
  }

  public async startCar(id: number, controller: AbortController) {
    try {
      const res = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, {
        method: 'PATCH',
        signal: controller.signal,
      });
      return res;
    } catch (err) {
      throw new Error(`Car ${id} has broken`);
    }
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
