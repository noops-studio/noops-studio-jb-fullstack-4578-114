import { Router } from 'express';
import GiftController from '../controllers/giftController';
import { validateGift } from '../middleware/validation';

const router = Router();

router.get('/:targetId', GiftController.getGiftsByTarget);
router.post('/', validateGift, GiftController.addGift);
router.delete('/:id', GiftController.deleteGift);

export default router;
