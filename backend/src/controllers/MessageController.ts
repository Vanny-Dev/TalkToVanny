import { Request, Response } from 'express';
import Message from '../models/Message';
import User from '../models/User';
// import { io } from '../server';

export class MessageController {
  static async createMessage(req: Request, res: Response) {
    try {
      const { recipient, content } = req.body;

      if (!recipient || !content) {
        return res.status(400).json({ error: 'Recipient and content are required' });
      }

      if (content.trim().length === 0) {
        return res.status(400).json({ error: 'Message cannot be empty' });
      }

      if (content.length > 500) {
        return res.status(400).json({ error: 'Message exceeds 500 characters' });
      }

      const user = await User.findOne({ username: recipient.toLowerCase() });

      if (!user) {
        return res.status(404).json({ error: 'Recipient not found' });
      }

      const messageCount = await Message.countDocuments({ recipient: user.username });
      const messageNumber = messageCount + 1;

      const message = new Message({
        recipient: user.username,
        content: content.trim(),
        author: 'Anonymous',
        messageNumber,
      });

      await message.save();

      const messageData = {
        id: message._id,
        content: message.content,
        messageNumber: message.messageNumber,
        liked: message.liked,
        createdAt: message.createdAt,
      };

      // ✅ FIXED: Emit BOTH message data AND updated count
      // io.to(`user:${user.username}`).emit('newMessage', {
      //   message: messageData,
      //   username: user.username,
      //   messageCount: messageNumber  // This is the new total count
      // });

      res.status(201).json({
        success: true,
        message: messageData,
      });
    } catch (error) {
      console.error('Create message error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async getMessagesByUsername(req: Request, res: Response) {
    try {
      const { username } = req.params;

      if (!username) {
        return res.status(400).json({ error: 'Username is required' });
      }

      const user = await User.findOne({ username: username.toLowerCase() });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const messages = await Message.find({ recipient: user.username })
        .sort({ createdAt: -1 })
        .lean();

      res.json({
        messages: messages.map(msg => ({
          id: msg._id,
          content: msg.content,
          messageNumber: msg.messageNumber,
          liked: msg.liked,
          createdAt: msg.createdAt,
        })),
      });
    } catch (error) {
      console.error('Get messages error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async toggleLike(req: Request, res: Response) {
    try {
      const { messageId } = req.params;

      if (!messageId) {
        return res.status(400).json({ error: 'Message ID is required' });
      }

      const message = await Message.findById(messageId);

      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }

      message.liked = !message.liked;
      await message.save();

      // Emit like update to the recipient's room
      // io.to(`user:${message.recipient}`).emit('messageUpdated', {
      //   id: message._id,
      //   liked: message.liked,
      // });

      res.json({
        success: true,
        liked: message.liked,
      });
    } catch (error) {
      console.error('Toggle like error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
}