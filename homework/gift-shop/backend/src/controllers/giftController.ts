import { Request, Response, NextFunction } from 'express';
import * as giftService from '../services/giftService';

export const getGiftsByTarget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const targetId = Number(req.params.targetId);
    const gifts = await giftService.getGiftsByTarget(targetId);
    res.json(gifts);
  } catch (err) {
    next(err);
  }
};

export const addGift = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newGift = await giftService.addGift(req.body);
    res.status(201).json(newGift);
  } catch (err) {
    next(err);
  }
};

export const deleteGift = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const giftId = Number(req.params.id);
    await giftService.deleteGift(giftId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};