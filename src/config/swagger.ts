import { SwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";

export const swaggerConf: SwaggerOptions = {
  swagger: {
    info: {
      title: "Note swagger",
      description: "Fastify Note API",
      version: "1.0.0",
    },
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [{ name: "Note", description: "Note related endpoints" }],
  },
  mode: "dynamic",
};

export const swaggerUiConf: FastifySwaggerUiOptions = {
  routePrefix: "/swagger",
  uiConfig: {
    docExpansion: "list",
  },
};
