const path = require("path");
const AutoLoad = require("@fastify/autoload");

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {};

module.exports = async function (fastify: any, opts: any) {
  // Load plugins in plugins directory
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "middleware"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "adapter/routes"),
    options: Object.assign({}, opts),
  });
};
