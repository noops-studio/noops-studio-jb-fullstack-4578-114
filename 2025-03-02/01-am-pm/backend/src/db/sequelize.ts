import { Sequelize } from 'sequelize-typescript';
import { config } from '../../config/config';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env as keyof typeof config];

const sequelize = new Sequelize({
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: 'mysql',
  models: [Category, Product],
  logging: true
});

export default sequelize;