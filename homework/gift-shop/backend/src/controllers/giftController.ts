import { Request, Response, NextFunction } from 'express';
import GiftService from '../services/giftService';

class GiftController {
  async getGiftsByTarget(req: Request, res: Response, next: NextFunction) {
    try {
      const targetId = Number(req.params.targetId);
      const gifts = await GiftService.getGiftsByTarget(targetId);
      res.json(gifts);
    } catch (err) {
      next(err);
    }
  }

  async addGift(req: Request, res: Response, next: NextFunction) {
    try {
      const newGift = await GiftService.addGift(req.body);
      res.status(201).json(newGift);
    } catch (err) {
      next(err);
    }
  }

  async deleteGift(req: Request, res: Response, next: NextFunction) {
    try {
      const giftId = Number(req.params.id);
      await GiftService.deleteGift(giftId);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export default new GiftController();