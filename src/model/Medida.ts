import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/database";
import Consulta from "./Consulta";

class Medida extends Model {
  public id!: number;
  public peso!: number;
  public massaMuscular!: number;
  public massaGorda!: number;
  public massaOssea!: number;
  public consultaId!: number;
}

Medida.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    peso: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    massaMuscular: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    massaGorda: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    massaOssea: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    consultaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: "medidas",
  }
);

Medida.belongsTo(Consulta, {
  constraints: true,
});

export default Medida;
