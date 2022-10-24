import INoteService from "../ports/INoteService";
import IInjectableModule from "../ports/IInjectableModule";
import INoteRepository from "../ports/INoteRepository";

class NoteService extends IInjectableModule implements INoteService {
  private _noteRepository: INoteRepository;

  constructor({ noteRepository }: any) {
    super();
    this._noteRepository = noteRepository;
  }

  getNoteFromId = (id: number) => {
    console.log(`test ${id}`);
    this._noteRepository.getNoteFromId(id);
  };

  dispose() {}
}

export default NoteService;
