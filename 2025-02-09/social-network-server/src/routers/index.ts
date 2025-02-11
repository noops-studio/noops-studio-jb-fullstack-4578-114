import { Router } from 'express';
import profileRouter from './profile';
import commentsRouter from './comments';
import followsRouter from './follows';

const router = Router();

router.use('/profile', profileRouter);
router.use("/follows", followsRouter);
router.use("/comments", commentsRouter);




export default router;

