import sequelize from '../config/database';
import Target from './Target';
import Gift from './Gift';

// Initialize models
Target.initModel(sequelize);
Gift.initModel(sequelize);

// Define associations
Target.hasMany(Gift, { foreignKey: 'targetId', as: 'gifts' });
Gift.belongsTo(Target, { foreignKey: 'targetId', as: 'target' });

export { sequelize, Target, Gift };
