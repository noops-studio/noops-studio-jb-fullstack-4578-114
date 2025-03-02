import { Router } from 'express';
import * as targetController from '../controllers/targetController';

const router = Router();

router.get('/', targetController.getAllTargets);

export default router;