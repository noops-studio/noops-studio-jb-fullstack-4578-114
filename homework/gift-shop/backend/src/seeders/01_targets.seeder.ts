import { QueryInterface } from 'sequelize';

// Function to insert data into the "targets" table
export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert('targets', [
    { id: 1, type: 'לקוחות' },
    { id: 2, type: 'ספקים' },
    { id: 3, type: 'עובדים' },
  ]);
}

// Function to remove the inserted data from the "targets" table
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('targets', {});
}
