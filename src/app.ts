import "dotenv/config";
import { fastifyAwilixPlugin } from "@fastify/awilix";
import Fastify, { FastifyInstance } from "fastify";
import autoLoadPluginsConf from "./config/autoLoadPlugin";
import autoLoadRoutesConf from "./config/autoLoadRoutes";
import corsConf from "./config/cors";
import healthcheckConf from "./config/healthCheck";
import openTelemetryConf from "./config/openTelemetry";
import { swaggerConf, swaggerUiConf } from "./config/swagger";
import awilixConf from "./config/awilix";
import { registerServices } from "../src/utils/awilix";

function build(): FastifyInstance {
  const fastify = Fastify({});

  // Plugins
  fastify.register(import("@fastify/swagger"), swaggerConf);
  fastify.register(import("@fastify/swagger-ui"), swaggerUiConf);

  fastify.register(import("@fastify/autoload"), autoLoadRoutesConf);
  fastify.register(import("@fastify/autoload"), autoLoadPluginsConf);

  fastify.register(fastifyAwilixPlugin, awilixConf);
  registerServices(fastify);

  fastify.register(import("@fastify/cors"), corsConf);

  fastify.register(
    import("@autotelic/fastify-opentelemetry"),
    openTelemetryConf
  );

  fastify.register(import("fastify-healthcheck"), healthcheckConf);

  // Error handler
  // fastify.setErrorHandler(customErrorHandler);

  return fastify;
}

async function start() {
  const port = (process.env.PORT || 3000) as number;
  const address = process.env.HOST || "0.0.0.0";

  try {
    const server = build();

    const opt = { port, address };

    console.log(`Server started at: http://${opt.address}:${opt.port}`);

    await server.listen(opt);
  } catch (err) {
    console.log("Error while starting server: ", err);
    process.exit(1);
  }
}

start();
