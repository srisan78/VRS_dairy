import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Leaf, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      // Navigate to wherever they came from, or dashboard
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    }
  };

  return (
    <div className="min-h-[85vh] flex relative animate-in fade-in">
      {/* Visual Side */}
      <div className="hidden lg:flex flex-[1.2] relative bg-hero-pattern overflow-hidden text-white">
        <img
          src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1000&q=80"
          alt="Dairy Farm"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20 z-0"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 flex flex-col justify-end p-16 text-white pb-24 mx-auto w-full max-w-2xl">
          <Leaf size={48} className="text-white mb-6" />
          <h2 className="text-[64px] leading-[1.1] font-bold mb-6">Welcome back to the farm.</h2>
          <p className="text-lg text-white/90 max-w-md leading-relaxed">Log in to manage your subscriptions and track your morning deliveries.</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 py-12 bg-milk-white shadow-login z-10">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center lg:text-left mb-10">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Log In</h1>
            <p className="text-gray-500">
              New here?{' '}
              <Link to="/signup" className="text-primary-green hover:text-primary-green-dark font-medium transition-colors">
                Create an account
              </Link>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-colors bg-gray-50"
                  placeholder="test@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-colors bg-gray-50"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex justify-end mt-2">
                <a href="#" className="text-sm text-gray-500 hover:text-primary-green transition-colors">Forgot password?</a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 bg-farm-green hover:bg-meadow-green text-white py-4 px-4 rounded-lg font-bold transition-colors disabled:opacity-70"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              {!isLoading && <ArrowRight size={18} />}
            </button>
            
            <div className="text-center mt-4">
               <p className="text-xs text-gray-400">Demo Login: test@example.com / password</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
