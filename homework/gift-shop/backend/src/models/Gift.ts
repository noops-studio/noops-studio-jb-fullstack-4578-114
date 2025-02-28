import { DataTypes, Model, Sequelize } from 'sequelize';

export interface GiftAttributes {
  id: number;
  targetId: number;
  name: string;
  description: string;
  price: number;
  discount: number;
}

export default class Gift extends Model<GiftAttributes> implements GiftAttributes {
  public id!: number;
  public targetId!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public discount!: number;

  static initModel(sequelize: Sequelize) {
    Gift.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        targetId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
          validate: { min: 0 }
        },
        discount: {
          type: DataTypes.FLOAT,
          allowNull: false,
          validate: { min: 0, max: 100 }
        }
      },
      {
        sequelize,
        modelName: 'Gift',
        tableName: 'gifts',
        timestamps: false
      }
    );
  }
}
