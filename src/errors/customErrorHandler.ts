import {
  FastifyReply,
  FastifyError,
  FastifyRequest,
  FastifyInstance,
} from "fastify";

const errorCodes = require("fastify").errorCodes;

function customErrorHandler(
  this: FastifyInstance,
  error: FastifyError,
  request: FastifyRequest,
  response: FastifyReply
) {
  request.openTelemetry().activeSpan?.recordException(error, new Date());
  this.log.error(error);

  // https://www.fastify.io/docs/latest/Reference/Errors/

  Object.keys(errorCodes).forEach((key) => {
    if ((error instanceof errorCodes[key], key))
      console.log(errorCodes[key], key);
  });

  if (error.statusCode === 401) {
    response.code(401);
    response.send({
      message: "Unauthorized",
    });
    return;
  }
  if (error.statusCode === 403) {
    response.code(403);
    response.send({
      message: "Forbidden",
    });
    return;
  }
  if (error.statusCode === 404) {
    response.code(404);
    response.send({
      message: "Not found",
    });
  }
  if (error.statusCode === 500) {
    response.code(500);
    response.send({
      message: "Internal Server Error",
    });
    return;
  }

  response.status(500).send({ message: "Unknown Error" });
}

export default customErrorHandler;
