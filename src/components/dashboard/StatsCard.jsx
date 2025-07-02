
import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    cyan: 'bg-cyan-100 text-cyan-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          </div>
          <motion.div 
            className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}
            whileHover={{ rotate: 15 }}
          >
            {icon}
          </motion.div>
        </div>
        
        <div className="mt-4">
          <div className="h-1 bg-gray-200 rounded-full">
            <motion.div 
              className={`h-full rounded-full ${colorClasses[color].replace('100', '500').replace(' text', '')}`}
              initial={{ width: 0 }}
              animate={{ width: '70%' }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;