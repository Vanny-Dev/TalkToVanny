const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  async getUser(username: string) {
    const response = await fetch(`${API_BASE_URL}/users/${username}`);
    if (!response.ok) throw new Error('User not found');
    return response.json();
  },

  async login(username: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    if (!response.ok) throw new Error('Invalid credentials');
    return response.json();
  },

  async verifyUser(username: string) {
    const response = await fetch(`${API_BASE_URL}/auth/verify/${username}`);
    if (!response.ok) throw new Error('User not found');
    return response.json();
  },

  async createMessage(recipient: string, content: string) {
    const response = await fetch(`${API_BASE_URL}/messages/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, content }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send message');
    }
    return response.json();
  },

  async getMessages(username: string) {
    const response = await fetch(`${API_BASE_URL}/messages/${username}`);
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
  },

  async toggleLike(messageId: string) {
    const response = await fetch(`${API_BASE_URL}/messages/${messageId}/like`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to toggle like');
    return response.json();
  },
};