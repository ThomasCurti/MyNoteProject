import { diContainer } from "@fastify/awilix";
import { asClass, Lifetime } from "awilix";
import HttpClient from "../adapter/HttpClient";
import NoteService from "../domain/NoteService";
import NoteRepository from "../adapter/Repository/NoteRepository";
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
    }),
  });
  diContainer.register({
    httpClient: asClass(HttpClient, {
      lifetime: Lifetime.SINGLETON,
      dispose: (module) => module.dispose(),
    }),
  });
};
