import express from 'express';
import { UserController } from '../controllers/UserController';

const router = express.Router();

router.get('/:username', UserController.getUserByUsername);

export default router;