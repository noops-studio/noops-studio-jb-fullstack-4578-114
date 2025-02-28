import { Router } from 'express';
import TargetController from '../controllers/targetController';

const router = Router();

router.get('/', TargetController.getAllTargets);

export default router;
