import "dotenv/config";
import { fastifyAwilixPlugin } from "@fastify/awilix";
import Fastify, { FastifyInstance } from "fastify";
import autoLoadPluginsConf from "./config/autoLoadPlugin";
import autoLoadRoutesConf from "./config/autoLoadRoutes";
import corsConf from "./config/cors";
import healthcheckConf from "./config/healthCheck";
import openTelemetryConf from "./config/openTelemetry";
import { swaggerConf, swaggerUiConf } from "./config/swagger";
import awilixConf from "./config/awilix";
import { registerServices } from "./utils/awilix";
import postgresConf from "./config/postgres";
import customErrorHandler from "./errors/customErrorHandler";
import {
  BasicTracerProvider,
  BatchSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from "@opentelemetry/sdk-metrics";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";

function metricsCollector() {
  const collectorOptions = {
    url: "http://127.0.0.1:4318/v1/metrics",
    concurrencyLimit: 1,
  };
  const exporter = new OTLPMetricExporter(collectorOptions);
  const meterProvider = new MeterProvider({});

  meterProvider.addMetricReader(
    new PeriodicExportingMetricReader({
      exporter,
      exportIntervalMillis: 2000,
    })
  );

  // Now, start recording data
  const meter = meterProvider.getMeter("example-meter");
  const counter = meter.createCounter("metric_name");
  counter.add(10, { key: "value" });
}

function otlCollector() {
  const collectorOptions = {
    url: "http://127.0.0.1:4318/v1/traces",
    concurrencyLimit: 10,
  };

  const provider = new BasicTracerProvider();
  const exporter = new OTLPTraceExporter(collectorOptions);

  provider.addSpanProcessor(
    new BatchSpanProcessor(exporter, {
      maxQueueSize: 1000,
      scheduledDelayMillis: 2000,
    })
  );

  provider.register();
}

export function build(): FastifyInstance {
  const opentelemetry = require("@opentelemetry/sdk-node");
  const {
    getNodeAutoInstrumentations,
  } = require("@opentelemetry/auto-instrumentations-node");
  const {
    diag,
    DiagConsoleLogger,
    DiagLogLevel,
  } = require("@opentelemetry/api");

  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

  const sdk = new opentelemetry.NodeSDK({
    traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),
    instrumentations: [getNodeAutoInstrumentations()],
  });

  sdk.start();

  console.log("test");

  const fastify = Fastify({ logger: { level: process.env.LOG_LVL || "info" } });

  // Plugins
  fastify.register(import("@fastify/swagger"), swaggerConf);
  fastify.register(import("@fastify/swagger-ui"), swaggerUiConf);

  fastify.register(import("@fastify/autoload"), autoLoadRoutesConf);
  fastify.register(import("@fastify/autoload"), autoLoadPluginsConf);

  fastify.register(fastifyAwilixPlugin, awilixConf);
  registerServices(fastify);

  fastify.register(
    import("@autotelic/fastify-opentelemetry"),
    openTelemetryConf
  );
  otlCollector();
  metricsCollector();

  fastify.register(import("@fastify/cors"), corsConf);

  fastify.register(import("fastify-healthcheck"), healthcheckConf);

  fastify.register(import("@fastify/postgres"), postgresConf);

  // Error handler
  fastify.setErrorHandler(customErrorHandler);

  return fastify;
}
