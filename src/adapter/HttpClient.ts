import IInjectableModule from "../ports/IInjectableModule";
import IHttpClient from "../ports/IHttpClient";

class HttpClient extends IInjectableModule implements IHttpClient {
  constructor() {
    super();
  }

  sendRandomGetCall() {
    throw new Error("Method not implemented.");
  }
}
