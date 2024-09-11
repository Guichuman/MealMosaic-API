import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/database";
import Refeicao from "./Refeicao";
import Alimento from "./Alimento";

class AlimentoRefeicao extends Model {
  public id!: number;
  public quantidadeTotal!: number;
  public caloriasTotais!: number;
  public proteinasTotais!: number;
  public gordurasTotais!: number;
  public carboidratosTotais!: number;
  public refeicaoId!: number;
  public alimentoId!: number;
}

AlimentoRefeicao.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantidadeTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    caloriasTotais: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    proteinasTotais: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gordurasTotais: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    carboidratosTotais: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    refeicaoId: {
      type: DataTypes.INTEGER,
      references: {
        model: Refeicao,
        key: "id",
      },
    },
    alimentoId: {
      type: DataTypes.INTEGER,
      references: {
        model: Alimento,
        key: "id",
      },
    },
  },

  {
    sequelize,
    modelName: "alimentoRefeicoes",
  }
);

Alimento.belongsToMany(Refeicao, { through: AlimentoRefeicao, foreignKey: 'alimentoId' });
Refeicao.belongsToMany(Alimento, { through: AlimentoRefeicao, foreignKey: 'refeicaoId' });

export default AlimentoRefeicao;
