import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/database';
import User from './Users'
import Alimento from './Alimento'
import Dieta from './Dieta'

class AlimentosDieta extends Model {
  public id!: number;
}

AlimentosDieta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'alimentosDietas',
  }
);

Alimento.belongsToMany(Dieta, {through: AlimentosDieta})
Dieta.belongsToMany(Alimento, {through: AlimentosDieta})

export default AlimentosDieta;