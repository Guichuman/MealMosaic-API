import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/database';
import Dieta from './Dieta'

class Alimento extends Model {
  public id!: number;
  public name!: string;
  public quantidade!: number;
  public calorias!: string;
  public carboidratos!: number;
  public proteinas!: number;
  public gorduras!: number;
}

Alimento.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    calorias: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    carboidratos: {
      type: DataTypes.INTEGER,
      allowNull: true,

    },
    proteinas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gorduras: {
        type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'alimento',
  }
);





export default Alimento;