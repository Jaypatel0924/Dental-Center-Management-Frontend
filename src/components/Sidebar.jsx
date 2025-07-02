
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  HiX, 
  HiHome, 
  HiUserGroup, 
  HiCalendar, 
  HiClipboardList, 
  HiUser 
} from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HiHome },
    { name: 'Patients', href: '/patients', icon: HiUserGroup, adminOnly: true },
    { name: 'Appointments', href: '/incidents', icon: HiClipboardList, adminOnly: true },
    { name: 'Calendar', href: '/calendar', icon: HiCalendar, adminOnly: true },
    { name: 'My Appointments', href: '/patient-view', icon: HiUser, patientOnly: true },
  ];
  
  const filteredNavigation = navigation.filter(item => {
    if (user?.role === 'Admin') {
      return !item.patientOnly;
    } else if (user?.role === 'Patient') {
      return !item.adminOnly;
    }
    return true;
  });

  return (
    <>
      {/* Mobile sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-700 to-cyan-700 shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-blue-600">
          <div className="flex items-center">
            <div className="bg-white w-8 h-8 rounded-md flex items-center justify-center">
              <span className="text-blue-700 font-bold text-lg">DC</span>
            </div>
            <span className="ml-3 text-white font-bold text-lg">Dental Center</span>
          </div>
          <button
            type="button"
            className="text-blue-200 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <HiX className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="py-4">
          <div className="px-4 py-3 flex items-center bg-blue-800/30 rounded mx-3 mb-4">
            <div className="bg-white text-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-bold">
              {user?.avatar || 'U'}
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-white">{user?.name}</div>
              <div className="text-xs text-blue-200">{user?.role}</div>
            </div>
          </div>
          
          <nav className="px-2">
            {filteredNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => 
                  `group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive 
                      ? 'bg-white text-blue-700' 
                      : 'text-blue-200 hover:bg-blue-800/50 hover:text-white'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    window.location.pathname === item.href
                      ? 'text-blue-700'
                      : 'text-blue-200 group-hover:text-white'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 bg-gradient-to-b from-blue-700 to-cyan-700">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center justify-center px-4">
              <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-blue-700 font-bold text-xl">DC</span>
              </div>
              <span className="ml-3 text-white font-bold text-xl">Dental Center</span>
            </div>
            
            <div className="mt-8 px-4">
              <div className="px-4 py-3 flex items-center bg-blue-800/30 rounded">
                <div className="bg-white text-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  {user?.avatar || 'U'}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-white">{user?.name}</div>
                  <div className="text-xs text-blue-200">{user?.role}</div>
                </div>
              </div>
            </div>
            
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {filteredNavigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => 
                    `group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                      isActive 
                        ? 'bg-white text-blue-700' 
                        : 'text-blue-200 hover:bg-blue-800/50 hover:text-white'
                    }`
                  }
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      window.location.pathname === item.href
                        ? 'text-blue-700'
                        : 'text-blue-200 group-hover:text-white'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;