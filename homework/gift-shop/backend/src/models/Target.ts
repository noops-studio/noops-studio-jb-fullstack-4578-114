import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Gift } from './Gift';

@Table({
  tableName: 'targets',
  timestamps: false
})
export class Target extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  type!: string;

  @HasMany(() => Gift, 'targetId')
  gifts?: Gift[];
}