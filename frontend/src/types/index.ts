export interface User {
  username: string;
  loginUsername?: string;
  createdAt: string;
  messageCount?: number;
}

export interface Message {
  id: string;
  content: string;
  messageNumber: number;
  liked: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
}