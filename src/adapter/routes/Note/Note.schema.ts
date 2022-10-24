export const getOpts = {
  schema: {
    description: "Get a note",
    tags: ["Note"],
    summary: "Get a note using its id",
    params: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "note id",
        },
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          id: { type: "string" },
          author: { type: "string" },
          body: { type: "string" },
        },
      },
    },
  },
};
