import INoteService from "../ports/INoteService";
import IInjectableModule from "../ports/IInjectableModule";
import INoteRepository from "../ports/INoteRepository";
import Note from "./Note";
import NoteRequest from "../adapter/routes/Note/NoteRequest";
import IHttpClient from "src/ports/IHttpClient";

class NoteService extends IInjectableModule implements INoteService {
  private _noteRepository: INoteRepository;
  private _httpClient: IHttpClient;

  constructor({ noteRepository, httpClient }: any) {
    super();
    this._noteRepository = noteRepository;
    this._httpClient = httpClient;
  }

  async getNoteFromIdOrAuthor(id?: number, author?: string): Promise<Note> {
    console.info(`Getting note ${id}`);
    // TODO OTL
    const noteDto = await this._noteRepository.getNoteFromIdOrAuthor(id);

    // TODO Automapper
    const note: Note = {
      id: noteDto.id,
      author: noteDto.author,
      body: noteDto.body,
    };

    return note;
  }

  async insertNote(noteRequest: NoteRequest): Promise<boolean> {
    // TODO OTL

    if (noteRequest.author.length > 255) {
      throw Error("Author name is greater than 255");
    }

    const httpResult = await this._httpClient.sendRandomGetCall();
    console.info(httpResult);

    const note: Note = {
      id: "0",
      author: `${noteRequest.author} - certified`,
      body: noteRequest.body,
    };

    const result = await this._noteRepository.insertNote(note);

    return result;
  }

  dispose() {}
}

export default NoteService;
