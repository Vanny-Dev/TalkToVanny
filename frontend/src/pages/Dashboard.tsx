import React, { useState, useEffect } from 'react';
import { Heart, Copy, LogOut, MessageCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Message } from '../types';
import { api } from '../services/api';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

const Dashboard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [copied, setCopied] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    const userData = JSON.parse(user);
    setUsername(userData.username);
    loadMessages(userData.username);

    // Initialize Socket.IO connection
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
    });

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
      // Join the user's room
      newSocket.emit('join', userData.username);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
    });

    // Listen for new messages
    newSocket.on('newMessage', (newMessage: Message) => {
      console.log('New message received:', newMessage);
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      
      // Optional: Show notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('New Message!', {
          body: newMessage.content.substring(0, 50) + '...',
          icon: '/favicon.ico',
        });
      }
    });

    // Listen for message updates (like toggle)
    newSocket.on('messageUpdated', ({ id, liked }: { id: string; liked: boolean }) => {
      console.log('Message updated:', id, liked);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === id ? { ...msg, liked } : msg
        )
      );
    });

    setSocket(newSocket);

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Cleanup on unmount
    return () => {
      if (newSocket) {
        newSocket.emit('leave', userData.username);
        newSocket.disconnect();
      }
    };

  }, [navigate]);

  const loadMessages = async (user: string) => {
    try {
      const response = await api.getMessages(user);
      setMessages(response.messages);
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (messageId: string) => {
    try {
      const response = await api.toggleLike(messageId);
      setMessages(messages.map(msg =>
        msg.id === messageId ? { ...msg, liked: response.liked } : msg
      ));
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  const handleLogout = () => {
    if (socket) {
      socket.emit('leave', username);
      socket.disconnect();
    }
    localStorage.removeItem('user');
    navigate('/');
  };
  const handleCopyLink = () => {
    const link = `${window.location.origin}/user/${username}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-violet-900 py-8 px-4 relative overflow-hidden">
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(168, 85, 247, 0.6), 0 0 60px rgba(168, 85, 247, 0.3);
          }
        }

        @keyframes heartPop {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.3); }
          50% { transform: scale(1.1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-pulse-custom {
          animation: pulse 2s ease-in-out infinite;
        }

        .message-card {
          opacity: 0;
          animation: fadeInUp 0.7s ease-out forwards;
        }

        .message-card:nth-child(1) { animation-delay: 0.1s; }
        .message-card:nth-child(2) { animation-delay: 0.2s; }
        .message-card:nth-child(3) { animation-delay: 0.3s; }
        .message-card:nth-child(4) { animation-delay: 0.4s; }
        .message-card:nth-child(5) { animation-delay: 0.5s; }
        .message-card:nth-child(n+6) { animation-delay: 0.6s; }

        .gradient-text {
          background: linear-gradient(90deg, #a855f7, #ec4899, #8b5cf6, #a855f7);
          background-size: 300% auto;
          animation: shimmer 4s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-effect {
          background: rgba(88, 28, 135, 0.3);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(168, 85, 247, 0.2);
        }

        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(168, 85, 247, 0.3);
        }

        .button-press:active {
          transform: scale(0.95);
        }

        .like-button:active {
          animation: heartPop 0.4s ease-in-out;
        }

        .bg-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.8), transparent);
          animation: float 6s ease-in-out infinite;
        }

        .particle:nth-child(1) {
          width: 100px;
          height: 100px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .particle:nth-child(2) {
          width: 150px;
          height: 150px;
          top: 60%;
          right: 10%;
          animation-delay: 2s;
        }

        .particle:nth-child(3) {
          width: 80px;
          height: 80px;
          bottom: 20%;
          left: 50%;
          animation-delay: 4s;
        }
      `}</style>

      {/* Animated Background Particles */}
      <div className="bg-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Card */}
        <div className="glass-effect rounded-3xl p-8 mb-8 animate-fadeInUp hover-lift">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-8 h-8 text-purple-400 animate-pulse-custom" />
                <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                  Dashboard
                </h1>
                {/* Connection Status Indicator */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                    }`}
                  />
                  <span className={`text-xs ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                    {isConnected ? 'Live' : 'Offline'}
                  </span>
                </div>
              </div>
              <p className="text-purple-300 text-lg mt-2">@{username}</p>
              <div className="mt-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-purple-400" />
                <span className="text-purple-200">
                  Total Messages: 
                  <span className="font-bold text-purple-400 ml-2 text-xl animate-pulse-custom">
                    {messages.length}
                  </span>
                </span>
              </div>
            </div>
            
            <div className="flex gap-3 animate-slideInRight">
              <button
                onClick={handleCopyLink}
                className="glass-effect px-6 py-3 rounded-2xl font-semibold text-purple-200 hover:text-white transition-all duration-300 button-press flex items-center gap-2 hover:bg-purple-600/30"
              >
                {copied ? (
                  <>
                    <div className="w-5 h-5 text-green-400">✓</div>
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
              <button onClick={handleLogout}
                className="glass-effect px-6 py-3 rounded-2xl font-semibold text-red-300 hover:text-red-200 transition-all duration-300 button-press flex items-center gap-2 hover:bg-red-600/30"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Messages Section */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-6"></div>
            <p className="text-purple-300 text-xl animate-pulse-custom">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="glass-effect rounded-3xl p-16 text-center animate-fadeInUp hover-lift">
            <div className="animate-float text-7xl mb-6">💌</div>
            <h3 className="text-3xl font-bold text-purple-200 mb-3">No messages yet</h3>
            <p className="text-purple-300 text-lg">Share your profile link to receive anonymous messages!</p>
            <div className="mt-8 inline-flex items-center gap-2 text-purple-400">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-custom"></div>
              <span>Waiting for magic...</span>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-custom" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className="glass-effect rounded-2xl p-6 hover-lift message-card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 bg-purple-900/40 px-4 py-2 rounded-full">
                    <MessageCircle className="w-4 h-4" />
                    Anonymous Message #{message.messageNumber}
                  </span>
                  <button
                    onClick={() => handleLike(message.id)}
                    className={`text-3xl like-button transition-all duration-300 ${
                      message.liked 
                        ? 'text-red-400 scale-110' 
                        : 'text-purple-400/40 hover:text-purple-300 hover:scale-110'
                    }`}
                  >
                    <Heart className={`w-7 h-7 ${message.liked ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <p className="text-purple-100 text-lg mb-4 leading-relaxed">{message.content}</p>
                <p className="text-xs text-purple-400/60 flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-400/60 rounded-full"></div>
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;