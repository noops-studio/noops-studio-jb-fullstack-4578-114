import { Router } from 'express';
import productController from '../controllers/product.controller';
import { validate } from '../middlewares/validation.middleware';
import Joi from 'joi';

const router = Router();

// Validation schema for creating a product
const createProductSchema = Joi.object({
  name: Joi.string().required().trim().min(2).max(100),
  manufacturingDate: Joi.date().iso().required(),
  expirationDate: Joi.date().iso().required(),
  categoryId: Joi.string().uuid().required(),
  price: Joi.number().precision(2).positive().required()
});

// Get products by category
router.get('/category/:categoryId', productController.getProductsByCategory);

// Create a new product
router.post('/', validate(createProductSchema), productController.createProduct);

// Delete a product
router.delete('/:id', productController.deleteProduct);

export default router;