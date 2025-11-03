import { Request, Response } from 'express';
import User from '../models/User';

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { username } = req.body;

      if (!username) {
        return res.status(400).json({ error: 'Username is required' });
      }

      const user = await User.findOne({ loginUsername: username });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      res.json({
        success: true,
        user: {
          username: user.username,
          loginUsername: user.loginUsername,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async verifyUser(req: Request, res: Response) {
    try {
      const { username } = req.params;

      const user = await User.findOne({ loginUsername: username });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        success: true,
        user: {
          username: user.username,
          loginUsername: user.loginUsername,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      console.error('Verify user error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
}