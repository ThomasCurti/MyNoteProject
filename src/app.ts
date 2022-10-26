import { build } from "./index";

async function start() {
  const port = (process.env.PORT || 3000) as number;
  const address = process.env.HOST || "0.0.0.0";

  try {
    const server = build();

    const opt = { port, address };

    console.info(`Server started at: http://${opt.address}:${opt.port}`);

    await server.listen(port, "0.0.0.0", () =>
      console.log("SERVER LISTENING AT PORT : " + port)
    );
  } catch (err) {
    console.error("Error while starting server: ", err);
    process.exit(1);
  }
}

start();
