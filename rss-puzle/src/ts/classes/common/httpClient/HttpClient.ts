export default class HttpClient {
  public async fetch<T>(url: string): Promise<T> {
    try {
      const response = await fetch(`${url}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error: ${error}, ${url} is not available`);
    }
  }
}
