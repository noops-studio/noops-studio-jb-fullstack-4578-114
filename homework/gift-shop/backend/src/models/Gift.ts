import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Target } from './Target';

@Table({
  tableName: 'gifts',
  timestamps: false
})
export class Gift extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;

  @ForeignKey(() => Target)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  targetId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: { min: 0 }
  })
  price!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: { min: 0, max: 100 }
  })
  discount!: number;

  @BelongsTo(() => Target, 'targetId')
  target?: Target;
}