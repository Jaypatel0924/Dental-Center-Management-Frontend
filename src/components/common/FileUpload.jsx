
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HiUpload, HiX } from 'react-icons/hi';

const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setFileName(file.name);
    onFileUpload(file);
  };

  const clearFile = () => {
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mt-1">
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center">
          <HiUpload className="h-10 w-10 text-gray-400 mb-3" />
          <p className="text-sm text-gray-600">
            <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
        </div>
      </div>
      
      {fileName && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 flex items-center justify-between bg-gray-50 rounded-lg p-3"
        >
          <div className="flex items-center">
            <div className="bg-gray-200 p-2 rounded-lg mr-3">
              <HiUpload className="h-5 w-5 text-gray-600" />
            </div>
            <p className="text-sm font-medium text-gray-800 truncate">{fileName}</p>
          </div>
          <button
            type="button"
            onClick={clearFile}
            className="text-gray-400 hover:text-red-500"
          >
            <HiX className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;