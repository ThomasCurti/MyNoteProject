import Note from "../domain/Note";
import NoteDto from "./NoteDto";

interface INoteRepository {
  getNoteFromIdOrAuthor(id?: number, author?: string): Promise<NoteDto>;

  insertNote(note: Note): Promise<boolean>;
}

export default INoteRepository;
