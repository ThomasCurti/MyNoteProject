import { AutoloadPluginOptions } from "@fastify/autoload";
import path from "path";

const autoLoadPluginsConf: AutoloadPluginOptions = {
  dir: path.join(__dirname, "../middleware"),
};

export default autoLoadPluginsConf;
