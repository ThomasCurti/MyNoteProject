import { diContainer } from "@fastify/awilix";
import { asClass, Lifetime } from "awilix";
import NoteService from "../domain/NoteService";
import NoteRepository from "../domain/NoteRepository";
import { FastifyInstance } from "fastify";

export const registerServices = (fastify: FastifyInstance) => {
  diContainer.register({
    noteService: asClass(NoteService, {
      lifetime: Lifetime.SINGLETON,
      dispose: (module) => module.dispose(),
    }),
  });
  diContainer.register({
    noteRepository: asClass(NoteRepository, {
      lifetime: Lifetime.SINGLETON,
      dispose: (module) => module.dispose(),
    }).inject(() => fastify),
  });
};
