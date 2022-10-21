import { FastifyCorsOptions } from "@fastify/cors";

const urls = process.env.CORS_ALLOWED_ORIGINS;
const corsConf: FastifyCorsOptions = {
  origin: urls?.split(","),
};

export default corsConf;
