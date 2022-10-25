import IInjectableModule from "../ports/IInjectableModule";
import IHttpClient from "../ports/IHttpClient";
import axios from "axios";

class HttpClient extends IInjectableModule implements IHttpClient {
  constructor() {
    super();
  }

  async sendRandomGetCall(): Promise<any> {
    // TODO OTL
    const result = await axios.get("https://example.com");

    return result.data;
  }
}

export default HttpClient;
