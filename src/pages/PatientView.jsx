
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { HiCalendar, HiDocumentText, HiChevronRight } from 'react-icons/hi';
import {useAuth} from '../context/AuthContext';
import { getIncidents, getPatients } from '../utils/dataUtils';
import { format } from 'date-fns';

const PatientView = () => {
  const { user } = useAuth();
  const incidents = getIncidents();
  const patients = getPatients();
  
  const patient = patients.find(p => p.id === user?.patientId);
  const patientIncidents = incidents.filter(i => i.patientId === user?.patientId);
  
  if (!user || user.role !== 'Patient') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto text-center py-16"
      >
        <h1 className="text-2xl font-bold text-gray-800">Access Denied</h1>
        <p className="text-gray-600 mt-2">This page is only accessible to patients</p>
      </motion.div>
    );
  }
  
  if (!patient) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto text-center py-16"
      >
        <h1 className="text-2xl font-bold text-gray-800">Patient Not Found</h1>
        <p className="text-gray-600 mt-2">Your patient record could not be located</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Dental Records</h1>
        <p className="text-gray-600 mt-2">View your appointments and treatment history</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-20 h-20 flex items-center justify-center font-bold text-2xl">
                {patient.avatar}
              </div>
              <h2 className="text-xl font-bold text-gray-800 mt-4">{patient.name}</h2>
              <p className="text-gray-600 mt-1">{patient.email}</p>
              
              <div className="w-full mt-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Date of Birth:</span>
                  <span className="text-gray-800">{patient.dob}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span className="text-gray-800">{patient.contact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Visit:</span>
                  <span className="text-gray-800">{patient.lastVisit || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Next Appointment:</span>
                  <span className="text-gray-800">{patient.nextAppointment || 'Not scheduled'}</span>
                </div>
              </div>
              
              <div className="mt-6 w-full">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Health Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                  {patient.healthInfo || 'No health information available'}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Appointments</h2>
            
            {patientIncidents.length === 0 ? (
              <div className="text-center py-8">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiCalendar className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No appointments found</h3>
                <p className="text-gray-500">You don't have any appointments scheduled yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {patientIncidents.map((incident, index) => (
                  <motion.div
                    key={incident.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className={`p-4 ${
                      incident.status === 'Scheduled' 
                        ? 'bg-blue-50 border-l-4 border-blue-500' 
                        : incident.status === 'Completed'
                          ? 'bg-green-50 border-l-4 border-green-500'
                          : 'bg-yellow-50 border-l-4 border-yellow-500'
                    }`}>
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-gray-800">{incident.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          incident.status === 'Scheduled' 
                            ? 'bg-blue-100 text-blue-800' 
                            : incident.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {incident.status}
                        </span>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-gray-600">
                        <HiCalendar className="mr-2" />
                        <span>{format(new Date(incident.appointmentDate), 'MMM dd, yyyy h:mm a')}</span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <p className="text-gray-600">{incident.description}</p>
                      
                      {incident.status === 'Completed' && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Treatment</h4>
                            <p className="text-gray-800">{incident.treatment || 'Not specified'}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Cost</h4>
                            <p className="text-gray-800">{`incident.cost ? $${incident.cost} : 'Not specified'`}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Next Appointment</h4>
                            <p className="text-gray-800">
                              {incident.nextDate 
                                ? format(new Date(incident.nextDate), 'MMM dd, yyyy') 
                                : 'Not scheduled'}
                            </p>
                          </div>
                          
                          {incident.files && incident.files.length > 0 && (
                            <div className="md:col-span-2">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {incident.files.map((file, fileIndex) => (
                                  <div key={fileIndex} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <div className="bg-gray-200 p-2 rounded-lg mr-3">
                                      <HiDocumentText className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                                    </div>
                                    <a 
                                      href={file.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="ml-2 text-cyan-600 hover:text-cyan-800"
                                    >
                                      <HiChevronRight className="h-5 w-5" />
                                    </a>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PatientView;