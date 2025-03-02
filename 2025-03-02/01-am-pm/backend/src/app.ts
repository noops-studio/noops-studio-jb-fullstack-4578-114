import express from 'express';
import sequelize from './db/sequelize';
import categoryRouter from './routers/category.router';
import productRouter from './routers/product.router';
import { errorHandler } from './middlewares/error.middleware';
import { seedData } from './seeders/seed';
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS middleware
app.use(cors());

// Routes
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);

// Error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Sync database models
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('Database connected and synchronized');
    
    // Seed initial data from dedicated seeder
    await seedData();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;


