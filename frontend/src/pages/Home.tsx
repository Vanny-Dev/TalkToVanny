import React from 'react';
import { MessageCircle, Lock, Sparkles, Send, LogIn, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-violet-900 flex items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(3deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rotateGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-pulse-custom {
          animation: pulse 2s ease-in-out infinite;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
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

        .button-primary {
          background: linear-gradient(135deg, #a855f7, #ec4899);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .button-primary:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px rgba(168, 85, 247, 0.4);
        }

        .button-secondary {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .button-secondary:hover {
          transform: translateY(-2px);
          background: rgba(168, 85, 247, 0.2);
        }

        .button-press:active {
          transform: scale(0.95);
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
          background: radial-gradient(circle, rgba(168, 85, 247, 0.6), transparent);
          animation: float 8s ease-in-out infinite;
        }

        .particle:nth-child(1) {
          width: 120px;
          height: 120px;
          top: 15%;
          left: 15%;
          animation-delay: 0s;
        }

        .particle:nth-child(2) {
          width: 180px;
          height: 180px;
          top: 50%;
          right: 10%;
          animation-delay: 2s;
        }

        .particle:nth-child(3) {
          width: 100px;
          height: 100px;
          bottom: 15%;
          left: 60%;
          animation-delay: 4s;
        }

        .particle:nth-child(4) {
          width: 140px;
          height: 140px;
          top: 70%;
          left: 20%;
          animation-delay: 6s;
        }

        .glow-ring {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.3), transparent);
          animation: rotateGlow 6s linear infinite;
          border-radius: 50%;
        }

        .feature-card {
          animation: slideUp 0.6s ease-out forwards;
        }

        .feature-card:nth-child(1) { animation-delay: 0.2s; opacity: 0; }
        .feature-card:nth-child(2) { animation-delay: 0.4s; opacity: 0; }
        .feature-card:nth-child(3) { animation-delay: 0.6s; opacity: 0; }
      `}</style>

      {/* Animated Background Particles */}
      <div className="bg-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="glass-effect rounded-[2.5rem] p-8 md:p-16 animate-fadeInScale relative overflow-hidden">
          {/* Rotating Glow Effect */}
          <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] opacity-20">
            <div className="glow-ring"></div>
          </div>

          <div className="relative z-10">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-float">
                  <MessageCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse-custom" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-6xl md:text-7xl font-bold text-center mb-4">
              <span className="gradient-text">TalkToVanny</span>
            </h1>
            
            <p className="text-purple-200 text-xl md:text-2xl text-center mb-12 max-w-2xl mx-auto">
              Send and receive anonymous messages with style
            </p>
            
            {/* Buttons */}
            <div className="space-y-4 mb-12">
              <button 
                 onClick={() => navigate('/user/vanny')}
                className="w-full button-primary text-white py-5 px-8 rounded-2xl text-lg font-semibold button-press flex items-center justify-center gap-3 group">
                <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                <span>Send Anonymous Message</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => navigate('/login')}
                className="w-full glass-effect button-secondary text-purple-200 py-5 px-8 rounded-2xl text-lg font-semibold button-press flex items-center justify-center gap-3 hover:text-white">
                <LogIn className="w-6 h-6" />
                <span>Owner Login</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="glass-effect rounded-2xl p-6 feature-card hover:bg-purple-900/30 transition-all duration-300">
                <MessageCircle className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <p className="text-purple-200 font-semibold">Anonymous</p>
                <p className="text-purple-400 text-sm mt-1">100% private</p>
              </div>
              
              <div className="glass-effect rounded-2xl p-6 feature-card hover:bg-purple-900/30 transition-all duration-300">
                <Lock className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <p className="text-purple-200 font-semibold">Secure</p>
                <p className="text-purple-400 text-sm mt-1">No tracking</p>
              </div>
              
              <div className="glass-effect rounded-2xl p-6 feature-card hover:bg-purple-900/30 transition-all duration-300">
                <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <p className="text-purple-200 font-semibold">Simple</p>
                <p className="text-purple-400 text-sm mt-1">Easy to use</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;