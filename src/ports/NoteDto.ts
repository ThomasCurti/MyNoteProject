import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize(process.env.PG_CONN || "");

class NoteDto extends Model {
  declare id: number;
  declare author: string;
  declare body: string;
}

export default NoteDto;
