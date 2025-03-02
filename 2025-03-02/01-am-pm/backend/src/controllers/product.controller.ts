import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { NotFoundError, BadRequestError } from '../errors/error-handler';

export class ProductController {
  async getProductsByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      
      // Check if the category exists
      const category = await Category.findByPk(categoryId);
      if (!category) {
        throw new NotFoundError(`Category with ID ${categoryId} not found`);
      }
      
      const products = await Product.findAll({
        where: { categoryId },
        include: [{
          model: Category,
          attributes: ['id', 'name']
        }]
      });
      
      return res.status(200).json({
        status: 'success',
        data: products
      });
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, manufacturingDate, expirationDate, categoryId, price } = req.body;
      
      // Check if the category exists
      const category = await Category.findByPk(categoryId);
      if (!category) {
        throw new NotFoundError(`Category with ID ${categoryId} not found`);
      }
      
      // Validate dates
      const mfgDate = new Date(manufacturingDate);
      const expDate = new Date(expirationDate);
      
      if (expDate <= mfgDate) {
        throw new BadRequestError('Expiration date must be after manufacturing date');
      }
      
      const product = await Product.create({
        name,
        manufacturingDate: mfgDate,
        expirationDate: expDate,
        categoryId,
        price
      });
      
      return res.status(201).json({
        status: 'success',
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      
      if (!product) {
        throw new NotFoundError(`Product with ID ${id} not found`);
      }
      
      await product.destroy();
      
      return res.status(200).json({
        status: 'success',
        message: 'Product deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();