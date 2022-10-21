// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify: any, opts: any) {
  fastify.decorate("someSupport", function () {
    return "hugs";
  });
});
