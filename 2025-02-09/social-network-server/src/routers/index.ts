import { Router } from 'express';
import profileRouter from './profile';
import commentsRouter from './comments';
import followsRouter from './follows';
import feedRouter from './feed';

const router = Router();

router.use('/profile', profileRouter);
router.use("/follows", followsRouter);
router.use("/comments", commentsRouter);
router.use("/feed", feedRouter);




export default router;

