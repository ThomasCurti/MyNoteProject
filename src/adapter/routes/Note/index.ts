import { getOpts, insertOpts } from "./Note.schema";
import NoteResponse from "./NoteResponse";
import INoteService from "../../../ports/INoteService";
import INoteRepository from "../../../ports/INoteRepository";
import NoteRequest from "./NoteRequest";

module.exports = async function (fastify: any, opts: any) {
  fastify.route({
    url: "/",
    method: ["GET"],
    schema: getOpts.schema,
    handler: async function (request: any, reply: any) {
      // TODO OTL
      const noteService: INoteService = request.diScope.resolve("noteService");

      const { id, author } = request.query;

      const result = await noteService.getNoteFromIdOrAuthor(id, author);
      // TODO OTL

      reply.send(new NoteResponse(result.id, result.author, result.body));
    },
  });

  fastify.post("/", insertOpts, async function (request: any, reply: any) {
    // TODO OTL
    const noteService: INoteService = request.diScope.resolve("noteService");

    const noteRequest: NoteRequest = request.body;
    const result = await noteService.insertNote(noteRequest);
    // TODO OTL

    reply.send({ success: result });
  });
};
