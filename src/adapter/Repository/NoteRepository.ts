import INoteRepository from "../../ports/INoteRepository";
import IInjectableModule from "../../ports/IInjectableModule";
import NoteDto from "../../ports/NoteDto";
import { FastifyInstance } from "fastify/types/instance";
import { PoolClient } from "pg";
import QueryStream from "pg-query-stream";
import pg from "pg";
import Note from "../../domain/Note";
import JSONStream from "jsonstream";

class NoteRepository extends IInjectableModule implements INoteRepository {
  constructor() {
    super();
  }

  dispose() {}

  async getNoteFromIdOrAuthor(id?: number, author?: string): Promise<NoteDto> {
    // TODO OTL
    const pool = new pg.Pool();

    pool.connect(
      (error: Error, client: PoolClient, done: (release?: any) => void) => {
        if (error) throw error;

        const query =
          "SELECT id, author, body FROM Notes WHERE id=$1 OR author=$2"; // TODO use another ORM ?

        console.log(client);

        const stream = client.query(
          query,
          [id || "", author || ""],
          (error, results) => {
            if (error) throw error;
            console.log(results.rows);
          }
        );
      }
    );
    throw new Error("Method not implemented.");
  }

  async insertNote(note: Note): Promise<boolean> {
    // TODO OTL
    const pool = new pg.Pool();

    pool.connect(
      (error: Error, client: PoolClient, done: (release?: any) => void) => {
        if (error) throw error;

        const query = "INSERT INTO Notes (author, body) VALUES ($1, $2)"; // TODO use another ORM ?

        const stream = client.query(
          query,
          [note.author, note.body],
          (error, results) => {
            if (error) throw error;
            console.log(results.rows);
          }
        );
      }
    );
    throw new Error("Method not implemented.");
  }
}

export default NoteRepository;
