import { Sequelize } from 'sequelize';
import config from './config';

const sequelize = new Sequelize(
  config.db.name as string,
  config.db.user as string,
  config.db.password as string,
  {
    host: config.db.host,
    port: Number(config.db.port),
    dialect: 'mysql',
    logging: false
  }
);

export default sequelize;
