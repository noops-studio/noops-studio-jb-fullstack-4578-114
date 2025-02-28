import { Request, Response, NextFunction } from 'express';
import TargetService from '../services/targetService';

class TargetController {
  async getAllTargets(req: Request, res: Response, next: NextFunction) {
    try {
      const targets = await TargetService.getAllTargets();
      res.json(targets);
    } catch (err) {
      next(err);
    }
  }
}

export default new TargetController();
