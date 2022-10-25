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
    if (error instanceof errorCodes[key]) console.log(errorCodes[key], key);
  });

  response.code(error.statusCode || 500);
  response.send({
    message: `${error.name}: ${error.message}`,
    stack: `${error.stack}`,
    validation: `${error.validation}`,
  });
  return;
}

export default customErrorHandler;
