
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientForm from './pages/PatientForm';
import Incidents from './pages/Incidents';
import IncidentForm from './pages/IncidentForm';
import CalendarView from './pages/CalendarView';
import PatientView from './pages/PatientView';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { initializeData } from './utils/dataUtils';
import './App.css';

function AppContent() {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
        />
      </div>
    );
  }

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar setSidebarOpen={setSidebarOpen} />
            
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/patients" element={<Patients />} />
                  <Route path="/patients/new" element={<PatientForm />} />
                  <Route path="/patients/:id" element={<PatientForm />} />
                  <Route path="/incidents" element={<Incidents />} />
                  <Route path="/incidents/new" element={<IncidentForm />} />
                  <Route path="/incidents/:id" element={<IncidentForm />} />
                  <Route path="/calendar" element={<CalendarView />} />
                  <Route path="/patient-view" element={<PatientView />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </div>
      )}
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;