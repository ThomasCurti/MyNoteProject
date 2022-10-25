import INoteRepository from "../../ports/INoteRepository";
import IInjectableModule from "../../ports/IInjectableModule";
import NoteDto from "../../ports/NoteDto";
import Note from "../../domain/Note";
import { DataTypes, Op, Sequelize } from "sequelize";

class NoteRepository extends IInjectableModule implements INoteRepository {
  private _sequilize: Sequelize;

  constructor() {
    super();

    this._sequilize = new Sequelize(process.env.PG_CONN || "");
    this.initDtos();
  }

  async getNoteFromIdOrAuthor(id?: number, author?: string): Promise<NoteDto> {
    // TODO OTL
    await this.authenticateConnection();

    const result = await NoteDto.findOne({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.and]: [{ [Op.ne]: null, [Op.eq]: id }],
            },
          },
          {
            author: {
              [Op.and]: [{ [Op.ne]: null, [Op.eq]: `${author} - certified` }],
            },
          },
        ],
      },
    });

    if (!result) throw new Error("Not Found"); //TODO Specific exception

    return result;
  }

  async insertNote(note: Note): Promise<boolean> {
    // TODO OTL
    await this.authenticateConnection();

    const result = await NoteDto.create({
      author: note.author,
      body: note.body,
    }).catch((error) => {
      throw new Error(error); // TODO Specific Error
    });

    if (!result) throw new Error(""); // TODO Specific Error

    return true;
  }

  private async initDtos() {
    NoteDto.init(
      {
        author: DataTypes.STRING,
        body: DataTypes.STRING,
      },
      { sequelize: this._sequilize, modelName: "notes" }
    );

    NoteDto.sync();
  }

  private async authenticateConnection() {
    try {
      await this._sequilize.authenticate();
    } catch (error) {
      throw new Error(`Unable to connect to the database: ${error}`);
    }
  }
}

export default NoteRepository;
