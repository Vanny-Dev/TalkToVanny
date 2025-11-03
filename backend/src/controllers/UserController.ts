import { Request, Response } from 'express';
import User from '../models/User';
import Message from '../models/Message';

export class UserController {
  static async getUserByUsername(req: Request, res: Response) {
    try {
      const { username } = req.params;

      if (!username) {
        return res.status(400).json({ error: 'Username is required' });
      }

      const user = await User.findOne({ username: username.toLowerCase() });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const messageCount = await Message.countDocuments({ recipient: user.username });

      res.json({
        username: user.username,
        createdAt: user.createdAt,
        messageCount,
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
}