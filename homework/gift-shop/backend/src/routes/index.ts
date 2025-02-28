import { Router } from 'express';
import targetRoutes from './targetRoutes';
import giftRoutes from './giftRoutes';

const router = Router();

router.use('/targets', targetRoutes);
router.use('/gifts', giftRoutes);

export default router;
