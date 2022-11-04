import { build } from "./index";

async function start() {
  const port = (process.env.PORT || 3000) as number;
  const address = process.env.HOST || "0.0.0.0";

  try {
    const server = build();

    const opt = { port, host: address };

    console.info(`Server started at: http://${opt.host}:${opt.port}`);

    await server.listen(opt);
  } catch (err) {
    console.error("Error while starting server: ", err);
    process.exit(1);
  }
}

start();
