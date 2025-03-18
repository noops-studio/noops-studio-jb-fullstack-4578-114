import { Router } from "express";
import { login, signup } from "../controllers/auth/controller";
import { loginValidator, signupValidator } from "../controllers/auth/validator";
import validation from "../middlewares/validation";

const authRouter = Router();
authRouter.post('/login', validation(loginValidator), login);
authRouter.post('/signup', validation(signupValidator), signup);

export default authRouter;