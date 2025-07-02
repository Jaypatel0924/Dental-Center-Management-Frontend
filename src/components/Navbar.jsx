
import React from 'react';
import { motion } from 'framer-motion';
import { HiMenu, HiBell, HiUserCircle } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-sm"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600 focus:outline-none lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <HiMenu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="ml-4 flex items-center">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">DC</span>
            </div>
            <h1 className="ml-3 text-xl font-bold text-gray-800 hidden md:block">
              Dental Center Dashboard
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-1 text-gray-500 hover:text-gray-700">
            <HiBell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          <div className="relative group">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="flex-shrink-0">
                {user ? (
                  <div className="bg-blue-500 text-white rounded-full w-9 h-9 flex items-center justify-center font-bold">
                    {user.avatar || 'U'}
                  </div>
                ) : (
                  <HiUserCircle className="h-9 w-9 text-gray-400" />
                )}
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-700">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.role}</div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50"
            >
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;