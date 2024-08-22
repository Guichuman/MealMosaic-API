import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/database";
import Cliente from "./Cliente";

class Consulta extends Model {
  public id!: number;
  public valor!: number;
  public clienteId!: number;
}

Consulta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    valor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "consultas",
  }
);

Consulta.belongsTo(Cliente, {
  constraints: true,
});

Cliente.hasMany(Consulta);

export default Consulta;
