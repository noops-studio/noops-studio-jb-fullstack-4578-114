import { QueryInterface } from 'sequelize';

// Function to insert data into the "gifts" table
export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert('gifts', [
    { 
      id: 1, 
      targetId: 1, 
      name: 'מתנה מיוחדת', 
      description: 'תיאור מתנה מיוחדת ללקוחות', 
      price: 100, 
      discount: 10 
    },
    { 
      id: 2, 
      targetId: 2, 
      name: 'מתנה לספקים', 
      description: 'תיאור מתנה לספקים איכותיים', 
      price: 200, 
      discount: 15 
    },
    { 
      id: 3, 
      targetId: 3, 
      name: 'מתנה לעובדים', 
      description: 'תיאור מתנה לעובדים המצטיינים', 
      price: 300, 
      discount: 20 
    },
  ]);
}

// Function to remove the inserted data from the "gifts" table
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('gifts', {});
}
