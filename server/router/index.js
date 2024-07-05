import { Router } from 'express';
import userController from '../controllers/user-controller.js';
import { body } from 'express-validator';
const router = new Router();
import authMiddleware from '../middlewares/auth-middleware.js'

router.post('/registration', body('email').isEmail(), body('email').isLength({min: 3, max: 32}), userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getAllUsers);

export default router;
