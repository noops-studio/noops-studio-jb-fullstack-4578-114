import { Router } from 'express';
import * as giftController from '../controllers/giftController';
import { validateGift } from '../middleware/validation';

const router = Router();

router.get('/:targetId', giftController.getGiftsByTarget);
router.post('/', validateGift, giftController.addGift);
router.delete('/:id', giftController.deleteGift);

export default router;