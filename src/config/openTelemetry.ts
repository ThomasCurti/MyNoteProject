import { OpenTelemetryPluginOptions } from "@autotelic/fastify-opentelemetry";

const openTelemetryConf: OpenTelemetryPluginOptions = {
  wrapRoutes: true,
};

export default openTelemetryConf;
