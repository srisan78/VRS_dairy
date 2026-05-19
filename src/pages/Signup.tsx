import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(name, email, password);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex relative animate-in fade-in">
      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 py-12 bg-milk-white shadow-login z-10 order-2 lg:order-1">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center lg:text-left mb-10">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-green hover:text-primary-green-dark font-medium transition-colors">
                Log in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-colors bg-gray-50"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
                  placeholder="you@email.com"
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
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 bg-farm-green hover:bg-meadow-green text-white py-4 px-4 rounded-lg font-bold transition-colors disabled:opacity-70"
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>
        </div>
      </div>

      {/* Visual Side */}
      <div className="hidden lg:flex flex-[1.2] relative bg-hero-pattern overflow-hidden order-1 lg:order-2">
        <img
           src="https://images.unsplash.com/photo-1529313780224-3a19f80bf806?auto=format&fit=crop&w=1000&q=80"
          alt="Fresh Milk"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20 z-0"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 flex flex-col justify-center p-16 text-white pb-24 mx-auto w-full max-w-2xl">
          <Leaf size={48} className="mb-6 text-white" />
          <h2 className="text-[64px] leading-[1.1] font-bold mb-6">Start your organic journey.</h2>
          <p className="text-lg text-white/90 max-w-md leading-relaxed">Join thousands of customers who chose health, purity, and sustainability.</p>
        </div>
      </div>
    </div>
  );
}
