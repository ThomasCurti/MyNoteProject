import { diContainer } from "@fastify/awilix";
import { asClass, asFunction, Lifetime } from "awilix";
import { FastifyInstance } from "fastify";
import { NoteService } from "../domain/NoteService";

export const registerServices = (fastify: FastifyInstance) => {
  diContainer.register({
    noteService: asClass(NoteService, {
      lifetime: Lifetime.SINGLETON,
      dispose: (module) => module.dispose(),
    }),
  });
};
