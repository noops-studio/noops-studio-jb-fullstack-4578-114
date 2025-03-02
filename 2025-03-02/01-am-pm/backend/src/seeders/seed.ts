import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

export const seedData = async () => {
  try {
    // Create categories
    const categories = [
      { name: 'Dairy Products' },
      { name: 'Bakery' },
      { name: 'Vegetables' },
      { name: 'Sweets' },
      { name: 'Beverages' }
    ];
    
    for (const category of categories) {
      await Category.findOrCreate({
        where: { name: category.name },
        defaults: category
      });
    }
    
    console.log('Categories seeded successfully');
    
    // Get all categories
    const allCategories = await Category.findAll();
    
    // Create sample products if none exist
    const productCount = await Product.count();
    
    if (productCount === 0 && allCategories.length > 0) {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      
      const products = [
        {
          name: 'Milk 3%',
          manufacturingDate: now,
          expirationDate: nextWeek,
          categoryId: allCategories[0].id,
          price: 5.90
        },
        {
          name: 'Fresh Bread',
          manufacturingDate: now,
          expirationDate: tomorrow,
          categoryId: allCategories[1].id,
          price: 8.50
        },
        {
          name: 'Cucumber',
          manufacturingDate: now,
          expirationDate: nextWeek,
          categoryId: allCategories[2].id,
          price: 3.20
        },
        {
          name: 'Chocolate Bar',
          manufacturingDate: now,
          expirationDate: nextMonth,
          categoryId: allCategories[3].id,
          price: 4.50
        },
        {
          name: 'Mineral Water',
          manufacturingDate: now,
          expirationDate: nextMonth,
          categoryId: allCategories[4].id,
          price: 6.90
        }
      ];
      
      await Product.bulkCreate(products);
      console.log('Sample products seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};