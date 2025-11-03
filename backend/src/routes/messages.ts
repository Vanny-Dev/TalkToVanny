import express from 'express';
import { MessageController } from '../controllers/MessageController';

const router = express.Router();

router.post('/create', MessageController.createMessage);
router.get('/:username', MessageController.getMessagesByUsername);
router.patch('/:messageId/like', MessageController.toggleLike);

export default router;