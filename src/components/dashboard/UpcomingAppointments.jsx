
import React from 'react';
import { motion } from 'framer-motion';
import { HiClock, HiUser, HiCalendar } from 'react-icons/hi';
import { format } from 'date-fns';

const UpcomingAppointments = ({ appointments }) => {
  if (appointments.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <HiCalendar className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-gray-500">No upcoming appointments</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment, index) => (
        <motion.div
          key={appointment.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-800">{appointment.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{appointment.description}</p>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              appointment.status === 'Scheduled' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {appointment.status}
            </span>
          </div>
          
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <HiClock className="mr-2" />
            <span>
              {format(new Date(appointment.appointmentDate), 'MMM dd, yyyy h:mm a')}
            </span>
          </div>
          
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <HiUser className="mr-2" />
            <span>Patient: {appointment.patientName || 'Unknown'}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default UpcomingAppointments;