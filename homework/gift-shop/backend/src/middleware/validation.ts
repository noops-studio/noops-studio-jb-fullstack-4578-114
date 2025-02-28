import { Request, Response, NextFunction } from 'express';

export function validateGift(req: Request, res: Response, next: NextFunction) {
  const { targetId, name, description, price, discount } = req.body;
  
  if (!targetId || !name || !description || price === undefined || discount === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (price < 0) {
    return res.status(400).json({ error: 'Price must be non-negative' });
  }

  if (discount < 0 || discount > 100) {
    return res.status(400).json({ error: 'Discount must be between 0 and 100' });
  }

  next();
}
