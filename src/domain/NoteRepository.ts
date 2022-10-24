import INoteRepository from "../ports/INoteRepository";
import IInjectableModule from "../ports/IInjectableModule";
import NoteDto from "../ports/NoteDto";
import { FastifyInstance } from "fastify/types/instance";

class NoteRepository extends IInjectableModule implements INoteRepository {
  private _fastify: any;

  constructor(fastifyInstance: FastifyInstance) {
    super();
    this._fastify = fastifyInstance;
  }

  dispose() {}

  async getNoteFromId(id: number): Promise<NoteDto> {
    const client = await this._fastify.pg.connect();
    throw new Error(`Method not implemented. `);
  }
}

export default NoteRepository;
