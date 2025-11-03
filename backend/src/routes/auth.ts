import express from 'express';
import { AuthController } from '../controllers/AuthController';

const router = express.Router();

router.post('/login', AuthController.login);
router.get('/verify/:username', AuthController.verifyUser);

export default router;