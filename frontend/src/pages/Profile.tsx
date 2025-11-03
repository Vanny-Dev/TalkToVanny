import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../../frontend/src/services/api';
import { ArrowLeft, Send, User, MessageCircle, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import type { User as UserType } from '../types';
// import { io, Socket } from 'socket.io-client';

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserType | null>(null);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [socket, setSocket] = useState<Socket | null>(null);

  // Initialize Socket.io connection
  // useEffect(() => {
  //   // Connect to your backend socket server
  //   const newSocket = io(import.meta.env.REACT_APP_API_URL || 'http://localhost:5000');
  //   setSocket(newSocket);

  //   // Cleanup on unmount
  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, []);

  // Load user data
  useEffect(() => {
    if (username) loadUser();
  }, [username]);

  // Listen for real-time message updates
  // useEffect(() => {
  //   if (!socket || !username) return;

  //   // Join room for this user (matches your server's 'join' event)
  //   socket.emit('join', username);

  //   // Listen for new message events
  //   socket.on('newMessage', (data: { username: string; messageCount: number }) => {
  //     if (data.username === username) {
  //       setUser(prev => prev ? { ...prev, messageCount: data.messageCount } : null);
  //     }
  //   });

  //   // Cleanup
  //   return () => {
  //     socket.off('newMessage');
  //     socket.emit('leave', username);
  //   };
  // }, [socket, username]);

  const loadUser = async () => {
    try {
      const data = await api.getUser(username!);
      setUser(data);
    } catch (err) {
      setError('User not found');
    } finally {
      setLoading(false);
    }
  };

  // Handle message typing
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 500) {
      setMessage(text);
      setCharCount(text.length);
    }
  };

  // Handle send message
  const handleSubmit = async () => {
    if (!message.trim()) {
      setError('Message cannot be empty');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setSending(true);
    setError('');

    try {
      await api.createMessage(username!, message);
      setSuccess(true);
      setMessage('');
      setCharCount(0);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  // Loading Spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-violet-900 flex items-center justify-center">
        <div className="spinner"></div>
        <style>{`
          .spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // User not found
  if (error && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-violet-900 flex items-center justify-center text-center text-white px-6">
        <div className="bg-purple-900/40 backdrop-blur-xl p-8 rounded-3xl border border-purple-600/40 shadow-2xl">
          <p className="text-red-400 text-xl mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="text-purple-300 hover:text-purple-200 font-semibold transition-all"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-violet-900 py-8 px-4 relative overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes successPop {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-custom { animation: pulse 2s ease-in-out infinite; }
        .animate-slideDown { animation: slideDown 0.4s ease-out forwards; }
        .animate-successPop { animation: successPop 0.5s ease-out forwards; }
        .gradient-text {
          background: linear-gradient(90deg, #a855f7, #ec4899, #8b5cf6, #a855f7);
          background-size: 300% auto;
          animation: shimmer 4s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glass-effect {
          background: rgba(88, 28, 135, 0.3);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(168, 85, 247, 0.2);
        }
        .input-glow { box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.3); }
        .button-primary {
          background: linear-gradient(135deg, #a855f7, #ec4899);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .button-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(168, 85, 247, 0.4);
        }
        .button-press:active { transform: scale(0.98); }
      `}</style>

      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-32 h-32 bg-purple-400/20 rounded-full blur-3xl top-10 left-10 animate-float"></div>
        <div className="absolute w-40 h-40 bg-pink-500/20 rounded-full blur-3xl bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="text-purple-300 hover:text-purple-200 font-semibold mb-6 flex items-center gap-2 transition-all duration-300 hover:gap-3 animate-fadeInUp"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* User Info */}
        <div className="glass-effect rounded-3xl p-8 mb-6 text-center animate-fadeInUp">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mx-auto flex items-center justify-center text-white text-4xl font-bold animate-float">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse-custom" />
            </div>
          </div>

          <h1 className="text-4xl font-bold gradient-text mb-3">@{user?.username}</h1>

          <div className="flex flex-col items-center gap-3 text-purple-300">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Member since {new Date(user?.createdAt || '').toLocaleDateString()}</span>
            </div>
            {user?.messageCount !== undefined && (
              <div className="inline-flex items-center gap-2 bg-purple-900/40 px-4 py-2 rounded-full">
                <MessageCircle className="w-4 h-4 text-purple-400" />
                <span className="font-semibold text-purple-200">
                  {user.messageCount} {user.messageCount === 1 ? 'message' : 'messages'} received
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Message Form */}
        <div className="glass-effect rounded-3xl p-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-3">
            <Send className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-purple-100">Send Anonymous Message</h2>
          </div>

          <p className="text-purple-300 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-custom"></span>
            Your message will be completely anonymous
          </p>

          {/* Success */}
          {success && (
            <div className="glass-effect bg-green-900/30 border border-green-500/30 text-green-200 px-5 py-4 rounded-2xl mb-6 flex items-center gap-3 animate-slideDown animate-successPop">
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">Message sent successfully!</span>
            </div>
          )}

          {/* Error */}
          {error && user && (
            <div className="glass-effect bg-red-900/30 border border-red-500/30 text-red-200 px-5 py-4 rounded-2xl mb-6 flex items-center gap-3 animate-slideDown">
              <AlertCircle className="w-6 h-6" />
              <span>{error}</span>
            </div>
          )}

          {/* Textarea */}
          <textarea
            value={message}
            onChange={handleMessageChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Type your anonymous message here... Be kind! 💜"
            className={`w-full px-5 py-4 glass-effect rounded-2xl text-white placeholder-purple-400 focus:outline-none transition-all duration-300 resize-none ${
              focused ? 'input-glow' : ''
            }`}
            rows={6}
          />

          {/* Footer */}
          <div className="flex justify-between items-center mt-4">
            <span className={`text-sm font-semibold ${charCount > 450 ? 'text-red-400' : 'text-purple-400'}`}>
              {charCount}/500 characters
            </span>
            <button
              onClick={handleSubmit}
              disabled={sending || !message.trim()}
              className="button-primary text-white py-3 px-8 rounded-xl font-semibold button-press disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {sending ? (
                <>
                  <div className="spinner"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <div className="glass-effect inline-flex items-center gap-3 px-6 py-3 rounded-full text-purple-300 text-sm">
            <MessageCircle className="w-4 h-4" />
            <span>100% anonymous</span>
            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
            <span>No tracking</span>
            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
            <span>No logging</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
