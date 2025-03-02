import { Request, Response, NextFunction } from 'express';
import * as targetService from '../services/targetService';

export const getAllTargets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const targets = await targetService.getAllTargets();
    res.json(targets);
  } catch (err) {
    next(err);
  }
};