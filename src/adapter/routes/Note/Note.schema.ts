export const getOpts = {
  schema: {
    description: "Get a note",
    tags: ["Note"],
    summary: "Get a note using its id",
    queryString: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Note id",
        },
        author: {
          type: "string",
          description: "Note author name",
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

export const insertOpts = {
  schema: {
    description: "Insert a note",
    tags: ["Note"],
    summary: "Insert a note",
    params: {
      type: "object",
      properties: {
        author: {
          type: "string",
          description: "Name of the author",
        },
        body: {
          type: "string",
          description: "Message of the note",
        },
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          success: { type: "boolean" },
        },
      },
    },
  },
};
