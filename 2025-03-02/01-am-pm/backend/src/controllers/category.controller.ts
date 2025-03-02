import { Request, Response, NextFunction } from 'express';
import { Category } from '../models/category.model';
import { NotFoundError } from '../errors/error-handler';

export class CategoryController {
  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await Category.findAll({
        attributes: ['id', 'name']
      });
      
      return res.status(200).json({
        status: 'success',
        data: categories
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      
      if (!category) {
        throw new NotFoundError(`Category with ID ${id} not found`);
      }
      
      return res.status(200).json({
        status: 'success',
        data: category
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();