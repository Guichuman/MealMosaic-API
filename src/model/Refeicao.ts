import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/database";
import Dieta from "./Dieta";

class Refeicao extends Model {
  public id!: number;
  public calorias!: number;
  public proteinas!: number;
  public gorduras!: number;
  public carboidratos!: number;
  public horario!: Date;
  public dietaId!: number;
}

Refeicao.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    calorias: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    horario: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    gorduras: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    carboidratos: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dietaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "refeicoes",
  }
);

Refeicao.belongsTo(Dieta, {
  constraints: true,
});

Dieta.hasMany(Refeicao);

export default Refeicao;
