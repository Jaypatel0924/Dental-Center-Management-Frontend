

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { HiX, HiDocumentText, HiCurrencyDollar } from 'react-icons/hi';
import { getIncidents, getPatients, saveIncidents } from '../utils/dataUtils';
import FileUpload from '../components/common/FileUpload';

const IncidentForm = ({ incident, onClose, onSave }) => {
  const patients = useMemo(() => getPatients(), []);
  
  const [formData, setFormData] = useState({
    id: '',
    patientId: '',
    title: '',
    description: '',
    comments: '',
    appointmentDate: '',
    cost: '',
    status: 'Scheduled',
    treatment: '',
    nextDate: '',
    files: []
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (incident) {
      const appointmentDate = incident.appointmentDate.slice(0, 16);
      const nextDate = incident.nextDate ? incident.nextDate.slice(0, 16) : '';
      
      setFormData({
        ...incident,
        appointmentDate,
        nextDate
      });
    } else {
      const now = new Date();
      const defaultDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const formattedDate = defaultDate.toISOString().slice(0, 16);
      
      setFormData({
        id: `i${Date.now()}`,
        patientId: patients.length > 0 ? patients[0].id : '',
        title: '',
        description: '',
        comments: '',
        appointmentDate: formattedDate,
        cost: '',
        status: 'Scheduled',
        treatment: '',
        nextDate: '',
        files: []
      });
    }
  }, [incident]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newFile = {
        name: file.name,
        type: file.type,
        url: reader.result
      };
      
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, newFile]
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (index) => {
    const newFiles = [...formData.files];
    newFiles.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      files: newFiles
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.patientId) newErrors.patientId = 'Patient is required';
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.appointmentDate) newErrors.appointmentDate = 'Appointment date is required';
    if (formData.status === 'Completed' && !formData.cost) newErrors.cost = 'Cost is required for completed appointments';
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Convert to Date objects for proper ISO formatting
    const formattedData = {
      ...formData,
      appointmentDate: new Date(formData.appointmentDate).toISOString(),
      nextDate: formData.nextDate ? new Date(formData.nextDate).toISOString() : ''
    };
    
    const incidents = getIncidents();
    let updatedIncidents;
    
    if (incident) {
      updatedIncidents = incidents.map(i => 
        i.id === formattedData.id ? formattedData : i
      );
    } else {
      updatedIncidents = [...incidents, formattedData];
    }
    
    saveIncidents(updatedIncidents);
    onSave(updatedIncidents);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-xl overflow-hidden"
    >
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {incident ? 'Edit Appointment' : 'Add New Appointment'}
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200"
          >
            <HiX className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient *</label>
            <select
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.patientId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all`}
            >
              <option value="">Select a patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
            {errors.patientId && <p className="mt-1 text-sm text-red-600">{errors.patientId}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all`}
              placeholder="Toothache, Cleaning, etc."
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date *</label>
            <input
              type="datetime-local"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.appointmentDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all`}
            />
            {errors.appointmentDate && <p className="mt-1 text-sm text-red-600">{errors.appointmentDate}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="Describe the appointment details..."
            ></textarea>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="Additional notes or observations..."
            ></textarea>
          </div>
          
          {formData.status === 'Completed' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Treatment</label>
                <input
                  type="text"
                  name="treatment"
                  value={formData.treatment}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Filling, Cleaning, Extraction, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiCurrencyDollar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 border ${errors.cost ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all`}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                {errors.cost && <p className="mt-1 text-sm text-red-600">{errors.cost}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Next Appointment</label>
                <input
                  type="datetime-local"
                  name="nextDate"
                  value={formData.nextDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
                <FileUpload onFileUpload={handleFileUpload} />
                
                {formData.files.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formData.files.map((file, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3 flex items-center">
                        <div className="bg-gray-100 p-2 rounded-lg mr-3">
                          <HiDocumentText className="h-6 w-6 text-gray-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.type}</p>
                        </div>
                        <button 
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-red-500 ml-2"
                        >
                          <HiX className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        
        <div className="mt-8 flex justify-end space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium shadow-md hover:from-cyan-600 hover:to-blue-600 transition-all"
          >
            {incident ? 'Update Appointment' : 'Add Appointment'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default IncidentForm;