import { DataTypes, Model, Sequelize } from 'sequelize';

export interface TargetAttributes {
  id: number;
  type: string;
}

export default class Target extends Model<TargetAttributes> implements TargetAttributes {
  public id!: number;
  public type!: string;

  static initModel(sequelize: Sequelize) {
    Target.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'Target',
        tableName: 'targets',
        timestamps: false
      }
    );
  }
}
