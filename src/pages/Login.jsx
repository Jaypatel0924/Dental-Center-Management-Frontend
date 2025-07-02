
import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import {useAuth} from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
 const [email, setEmail] = useState('admin@entnt.in');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md"
      >
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-8 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto"
          >
            <span className="text-cyan-600 text-3xl font-bold">DC</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mt-4"
          >
            Dental Center
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 opacity-90"
          >
            Management Dashboard
          </motion.p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-4"
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
              required
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
              required
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Sign In
            </button>
          </motion.div>
        </form>
        
        <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-600">
          <p>Admin: admin@entnt.in / admin123</p>
          <p className="mt-1">Patient: john@entnt.in / patient123</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;