import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/database';
import Cliente from './Cliente'

class Dieta extends Model {
  public id!: number;
  public description!: string;
  public data!: string;
  public calories!: string;
  public macros!: string;
  public clienteId!: number;
  public status!: number;
}

Dieta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    macros: {
      type: DataTypes.STRING,
      allowNull: true,

    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'dietas',
  }
);

Dieta.belongsTo(Cliente, {
  constraints: true
});

Cliente.hasMany(Dieta);

export default Dieta;