import { FastifyHealthcheckOptions } from "fastify-healthcheck";

const healthcheckConf: FastifyHealthcheckOptions = {
  healthcheckUrl: process.env.HEALTH_CHECK_URL || "/health",
  healthcheckUrlAlwaysFail:
    process.env.HEALTH_CHECK_URL_ALWAYS_FAIL === "true" || false,
  exposeUptime: process.env.HEALTH_CHECK_EXPOSE_UP_TIME === "true" || false,
};
export default healthcheckConf;
