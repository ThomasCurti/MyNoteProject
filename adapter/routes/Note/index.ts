import { RouteShorthandOptions } from "fastify";
import NoteResponse from "./NoteResponse";

module.exports = async function (fastify: any, opts: any) {
  const getOpts: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            note: {
              type: "NoteResponse",
            },
          },
        },
      },
    },
  };

  fastify.get("/:id:/", async function (request: any, reply: any) {
    return new NoteResponse("test", "test", "test");
  });

  fastify.post("/insert/", async function (request: any, reply: any) {
    return "this is an example";
  });
};