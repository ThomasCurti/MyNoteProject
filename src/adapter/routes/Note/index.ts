import { getOpts, insertOpts } from "./Note.schema";
import NoteResponse from "./NoteResponse";
import INoteService from "../../../ports/INoteService";
import INoteRepository from "../../../ports/INoteRepository";
import NoteRequest from "./NoteRequest";
import { Span } from "@opentelemetry/sdk-trace-base";
import { FastifyReply, FastifyRequest } from "fastify";

module.exports = async function (fastify: any, opts: any) {
  fastify.route({
    url: "/",
    method: ["GET"],
    schema: getOpts.schema,
    handler: async function (
      request: FastifyRequest<{ Querystring: { id: number; author: string } }>,
      reply: FastifyReply
    ) {
      const span = request.openTelemetry().tracer.startSpan("Get Note");

      const noteService: INoteService = request.diScope.resolve("noteService");

      const { id, author } = request.query;
      const result = await noteService.getNoteFromIdOrAuthor(id, author);

      span.addEvent("Found note", Date.now());

      reply.send(new NoteResponse(result.id, result.author, result.body));

      span.end();
    },
  });

  fastify.post(
    "/",
    insertOpts,
    async function (
      request: FastifyRequest<{ Body: { author: string; body: string } }>,
      reply: FastifyReply
    ) {
      const span = request.openTelemetry().tracer.startSpan("Insert Note");

      const noteService: INoteService = request.diScope.resolve("noteService");

      const noteRequest: NoteRequest = request.body;
      const result = await noteService.insertNote(noteRequest);

      span.addEvent("Inserted note", Date.now());

      reply.send({ success: result });

      span.end();
    }
  );
};
