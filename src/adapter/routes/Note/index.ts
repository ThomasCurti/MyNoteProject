import { getOpts } from "./Note.schema";
import NoteResponse from "./NoteResponse";
import INoteService from "../../../ports/INoteService";
import INoteRepository from "../../../ports/INoteRepository";

module.exports = async function (fastify: any, opts: any) {
  fastify.route({
    url: "/:id",
    method: ["GET"],
    schema: getOpts.schema,
    handler: async function (request: any, reply: any) {
      const noteService: INoteService = request.diScope.resolve("noteService");

      await noteService.getNoteFromId(request.params.id);

      reply.send(new NoteResponse("test", "test", "test"));
    },
  });

  fastify.post("/", async function (request: any, reply: any) {
    return "this is an example";
  });
};
