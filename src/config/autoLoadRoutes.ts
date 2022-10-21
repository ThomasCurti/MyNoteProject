import { AutoloadPluginOptions } from "@fastify/autoload";
import path from "path";

const autoLoadRoutesConf: AutoloadPluginOptions = {
  dir: path.join(__dirname, "../adapter/routes/"),
};

export default autoLoadRoutesConf;
