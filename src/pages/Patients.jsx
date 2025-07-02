
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash, HiSearch } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { getPatients, savePatients } from '../utils/dataUtils';
import PatientForm from './PatientForm';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const patientsData = getPatients();
    setPatients(patientsData);
    setFilteredPatients(patientsData);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = patients.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.contact.includes(searchTerm)
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patients);
    }
  }, [searchTerm, patients]);

  const handleDelete = (id) => {
    const updatedPatients = patients.filter(patient => patient.id !== id);
    setPatients(updatedPatients);
    setFilteredPatients(updatedPatients);
    savePatients(updatedPatients);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Patient Management</h1>
          <p className="text-gray-600 mt-2">View and manage all patients in your dental practice</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setSelectedPatient(null);
            setShowForm(true);
          }}
          className="mt-4 md:mt-0 flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow-md"
        >
          <HiPlus className="mr-2" />
          Add New Patient
        </motion.button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patients by name, email or phone..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {showForm ? (
        <PatientForm 
          patient={selectedPatient} 
          onClose={() => {
            setShowForm(false);
            setSelectedPatient(null);
          }} 
          onSave={(updatedPatients) => {
            setPatients(updatedPatients);
            setFilteredPatients(updatedPatients);
            setShowForm(false);
          }}
        />
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No patients found. Add a new patient to get started.
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient, index) => (
                    <motion.tr 
                      key={patient.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-blue-100 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                            {patient.avatar}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                            <div className="text-sm text-gray-500">{patient.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{patient.contact}</div>
                        <div className="text-sm text-gray-500">{patient.dob}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.lastVisit || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setSelectedPatient(patient);
                            setShowForm(true);
                          }}
                          className="text-cyan-600 hover:text-cyan-900 mr-4"
                        >
                          <HiPencil className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(patient.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <HiTrash className="h-5 w-5" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Patients;