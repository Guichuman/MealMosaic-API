import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/database';
import User, { UserAttributes } from './Users'

export interface ClienteAttributes extends UserAttributes {
  height: number;
  weight: number;
  nutriId: number;
}

class Cliente extends User implements ClienteAttributes {
  public height!: number;
  public weight!: number;
  public nutriId!: number;
}


Cliente.init(
  {
    ...User.getAttributes(),
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nutriId: {
        type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'clientes',
  }
);

export default Cliente;