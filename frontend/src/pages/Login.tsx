import { useState } from 'react';
import { ArrowLeft, LogIn, User, AlertCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await api.login(username);
      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }

    // Simulate login
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-violet-900 flex items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-custom {
          animation: pulse 2s ease-in-out infinite;
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease-out forwards;
        }

        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }

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

        .input-glow {
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.3);
        }

        .button-primary {
          background: linear-gradient(135deg, #a855f7, #ec4899);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .button-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(168, 85, 247, 0.4);
        }

        .button-press:active {
          transform: scale(0.98);
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
          background: radial-gradient(circle, rgba(168, 85, 247, 0.5), transparent);
          animation: float 6s ease-in-out infinite;
        }

        .particle:nth-child(1) {
          width: 100px;
          height: 100px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .particle:nth-child(2) {
          width: 150px;
          height: 150px;
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }

        .particle:nth-child(3) {
          width: 80px;
          height: 80px;
          bottom: 25%;
          left: 50%;
          animation-delay: 4s;
        }

        .spinner {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 3px solid white;
          width: 24px;
          height: 24px;
          animation: spin 0.8s linear infinite;
        }
      `}</style>

      {/* Animated Background Particles */}
      <div className="bg-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="glass-effect rounded-3xl p-8 md:p-10 animate-fadeInScale">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-float">
              <LogIn className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
            <span className="gradient-text">Welcome Back</span>
          </h1>
          <p className="text-center text-purple-300 mb-8 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Owner Login
            <Sparkles className="w-4 h-4" />
          </p>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-purple-200 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className={`w-full pl-12 pr-4 py-4 glass-effect rounded-2xl text-white placeholder-purple-400 focus:outline-none transition-all duration-300 ${
                    focused ? 'input-glow' : ''
                  }`}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="glass-effect bg-red-900/30 border border-red-500/30 text-red-200 px-4 py-3 rounded-2xl flex items-center gap-3 animate-slideDown animate-shake">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full button-primary text-white py-4 px-6 rounded-2xl font-semibold button-press disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </>
              )}
            </button>
          </div>

          {/* Back Button */}
          <button 
            onClick={() => navigate('/')}
            className="w-full mt-6 text-purple-300 hover:text-purple-200 transition-colors font-semibold flex items-center justify-center gap-2 py-2">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-purple-400 text-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-custom"></div>
              <span>Secure Authentication</span>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-custom" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;