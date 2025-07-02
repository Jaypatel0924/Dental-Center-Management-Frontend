
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight, HiCalendar } from 'react-icons/hi';
import { getIncidents, getPatients } from '../utils/dataUtils';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const incidents = getIncidents();
  const patients = getPatients();

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown';
  };

  const getDayEvents = (day) => {
    return incidents.filter(incident => 
      isSameDay(new Date(incident.appointmentDate), day)
    );
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Appointment Calendar</h1>
          <p className="text-gray-600 mt-2">View and manage your dental appointments</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevMonth}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <HiChevronLeft className="h-5 w-5 text-gray-700" />
          </motion.button>
          <h2 className="text-xl font-semibold text-gray-800">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextMonth}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <HiChevronRight className="h-5 w-5 text-gray-700" />
          </motion.button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 bg-gray-50 border-b">
          {weekDays.map((day, index) => (
            <div key={index} className="py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const dayEvents = getDayEvents(day);
            const isCurrentMonth = isSameMonth(day, monthStart);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.02 }}
                className={`min-h-32 border-r border-b ${index > 27 ? 'border-b-0' : ''} ${index % 7 === 6 ? 'border-r-0' : ''} ${
                  isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
                }`}
              >
                <div className="p-2 h-full">
                  <div className={`text-right text-sm font-medium ${
                    isSameDay(day, new Date()) 
                      ? 'bg-blue-500 text-white w-7 h-7 rounded-full flex items-center justify-center ml-auto'
                      : ''
                  }`}>
                    {format(day, dateFormat)}
                  </div>
                  
                  <div className="mt-1 space-y-1 max-h-24 overflow-y-auto">
                    {dayEvents.map((event, eventIndex) => (
                      <motion.div
                        key={eventIndex}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + eventIndex * 0.05 }}
                        className="bg-blue-50 text-blue-800 rounded p-2 text-xs"
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="flex items-center mt-1">
                          <HiCalendar className="h-3 w-3 mr-1" />
                          <span className="truncate">{format(new Date(event.appointmentDate), 'h:mm a')}</span>
                        </div>
                        <div className="truncate">{getPatientName(event.patientId)}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default CalendarView;