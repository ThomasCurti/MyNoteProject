interface IHttpClient {
  sendRandomGetCall(): Promise<any>;
}

export default IHttpClient;
