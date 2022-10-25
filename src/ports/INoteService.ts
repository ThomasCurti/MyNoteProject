import NoteRequest from "../adapter/routes/Note/NoteRequest";
import Note from "../domain/Note";

interface INoteService {
  getNoteFromIdOrAuthor(id?: number, author?: string): Promise<Note>;

  insertNote(noteRequest: NoteRequest): Promise<boolean>;
}

export default INoteService;
