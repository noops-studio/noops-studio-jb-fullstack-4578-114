import sequelize from './config/database';
import { QueryInterface } from 'sequelize';
import { up as targetsUp } from './seeders/01_targets.seeder';
import { up as giftsUp } from './seeders/02_gifts.seeder';

(async function runSeeders() {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Get the QueryInterface from Sequelize
    const queryInterface: QueryInterface = sequelize.getQueryInterface();

    // Run the targets seeder
    console.log('Running targets seeder...');
    await targetsUp(queryInterface);

    // Run the gifts seeder
    console.log('Running gifts seeder...');
    await giftsUp(queryInterface);

    console.log('Seeders completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error running seeders:', error);
    process.exit(1);
  }
})();
