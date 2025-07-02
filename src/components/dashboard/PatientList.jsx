
import React from 'react';
import { motion } from 'framer-motion';
import { HiUserCircle } from 'react-icons/hi';

const PatientList = ({ patients }) => {
  return (
    <div className="space-y-4">
      {patients.map((patient, index) => (
        <motion.div
          key={patient.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="bg-blue-100 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-bold">
            {patient.avatar}
          </div>
          <div className="ml-4 flex-1 min-w-0">
            <div className="font-medium text-gray-800 truncate">{patient.name}</div>
            <div className="text-sm text-gray-500 truncate">{patient.email}</div>
          </div>
          <div className="text-xs text-gray-500 whitespace-nowrap">
            {patient.lastVisit || 'New'}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PatientList;