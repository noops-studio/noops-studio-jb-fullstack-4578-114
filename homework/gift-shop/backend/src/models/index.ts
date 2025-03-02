import sequelize from '../config/database';
import { Target } from './Target';
import { Gift } from './Gift';

// Add models to sequelize
sequelize.addModels([Target, Gift]);

export { sequelize, Target, Gift };