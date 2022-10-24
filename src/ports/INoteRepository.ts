import NoteDto from "./NoteDto";

interface INoteRepository {
  getNoteFromId(id: number): Promise<NoteDto>;
}

export default INoteRepository;
