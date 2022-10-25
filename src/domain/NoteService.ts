import INoteService from "../ports/INoteService";
import IInjectableModule from "../ports/IInjectableModule";
import INoteRepository from "../ports/INoteRepository";
import Note from "./Note";
import NoteRequest from "../adapter/routes/Note/NoteRequest";

class NoteService extends IInjectableModule implements INoteService {
  private _noteRepository: INoteRepository;

  constructor({ noteRepository }: any) {
    super();
    this._noteRepository = noteRepository;
  }

  async getNoteFromIdOrAuthor(id?: number, author?: string): Promise<Note> {
    console.log(`Getting note ${id}`);
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
