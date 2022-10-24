import { getOpts } from "./Note.schema";
import NoteResponse from "./NoteResponse";
import INoteService from "../../../ports/INoteService";

module.exports = async function (fastify: any, opts: any) {
  fastify.route({
    url: "/:id",
    method: ["GET"],
    schema: getOpts.schema,
    handler: async function (request: any, reply: any) {
      console.log(request.diScope.resolve("noteService"));
      reply.send(new NoteResponse("test", "test", "test"));
    },
  });

  fastify.post("/", async function (request: any, reply: any) {
    return "this is an example";
  });
};
