import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Category } from './category.model';

@Table({
  tableName: 'products',
  timestamps: true
})
export class Product extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4()
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  manufacturingDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  expirationDate!: Date;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  categoryId!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  price!: number;

  @BelongsTo(() => Category)
  category?: Category;
}