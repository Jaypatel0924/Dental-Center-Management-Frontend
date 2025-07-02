
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { getPatients, savePatients } from '../utils/dataUtils';

const PatientForm = ({ patient, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    dob: '',
    contact: '',
    email: '',
    address: '',
    healthInfo: '',
    avatar: '',
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (patient) {
      setFormData({
        id: patient.id,
        name: patient.name,
        dob: patient.dob,
        contact: patient.contact,
        email: patient.email,
        address: patient.address,
        healthInfo: patient.healthInfo,
        avatar: patient.avatar || getInitials(patient.name),
      });
    } else {
      setFormData({
        id: `p${Date.now()}`,
        name: '',
        dob: '',
        contact: '',
        email: '',
        address: '',
        healthInfo: '',
        avatar: '',
      });
    }
  }, [patient]);

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'name' && { avatar: getInitials(value) })
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.contact) newErrors.contact = 'Contact number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const patients = getPatients();
    let updatedPatients;
    
    if (patient) {
      updatedPatients = patients.map(p => 
        p.id === formData.id ? { ...formData } : p
      );
    } else {
      updatedPatients = [...patients, formData];
    }
    
    savePatients(updatedPatients);
    onSave(updatedPatients);
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
            {patient ? 'Edit Patient' : 'Add New Patient'}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all`}
              placeholder="John Doe"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all`}
            />
            {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.contact ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all`}
              placeholder="1234567890"
            />
            {errors.contact && <p className="mt-1 text-sm text-red-600">{errors.contact}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="123 Main St, City"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Avatar Initials</label>
            <div className="flex items-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                {formData.avatar}
              </div>
              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                maxLength={2}
                className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="JD"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Health Information</label>
          <textarea
            name="healthInfo"
            value={formData.healthInfo}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            placeholder="Allergies, medical conditions, special notes..."
          ></textarea>
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
            {patient ? 'Update Patient' : 'Add Patient'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default PatientForm;