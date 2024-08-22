import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/database";
import Medida from "./Medida";

class Circunferencia extends Model {
  public id!: number;
  public bracoEsquerdoContraido!: number;
  public bracoDireitoContraido!: number;
  public bracoEsquerdoRelaxado!: number;
  public bracoDireitoRelaxado!: number;
  public coxaEsquerdaProximal!: number;
  public coxaDireitaProximal!: number;
  public coxaDireitaDistal!: number;
  public coxaEsquerdaDistal!: number;
  public panturrilhaEsquerda!: number;
  public panturrilhaDireita!: number;
  public quadril!: number;
  public abdomen!: number;
  public cintura!: number;
  public torax!: number;
  public peitoral!: number;
  public antebracoEsquerdo!: number;
  public antebracoDireito!: number;
  public medidaId!: number;
}

Circunferencia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bracoEsquerdoContraido: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    bracoDireitoContraido: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    bracoEsquerdoRelaxado: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    bracoDireitoRelaxado: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    coxaEsquerdaProximal: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    coxaDireitaProximal: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    coxaDireitaDistal: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    coxaEsquerdaDistal: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    panturrilhaEsquerda: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    panturrilhaDireita: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    quadril: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    abdomen: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    cintura: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    torax: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    peitoral: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    antebracoEsquerdo: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    antebracoDireito: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    medidaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "circunferencias",
  }
);

Circunferencia.belongsTo(Medida, {
  constraints: true,
});

export default Circunferencia;
