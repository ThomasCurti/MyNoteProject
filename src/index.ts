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
import { registerServices } from "./utils/awilix";
import postgresConf from "./config/postgres";
import customErrorHandler from "./errors/customErrorHandler";

export function build(): FastifyInstance {
  const fastify = Fastify({ logger: { level: process.env.LOG_LVL || "info" } });
  console.log(process.env.LOG_LVL);

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

  fastify.register(import("@fastify/postgres"), postgresConf); // "postgres://admin:admin@localhost/Notes"

  // Error handler
  fastify.setErrorHandler(customErrorHandler);

  return fastify;
}
