/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify: any, opts: any) {
  fastify.register(require("@fastify/sensible"), {
    errorHandler: false,
  });
});
