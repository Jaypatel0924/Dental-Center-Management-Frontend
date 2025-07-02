
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  HiUserGroup, 
  HiCalendar, 
  HiCheckCircle, 
  HiCurrencyDollar,
  HiChartBar
} from 'react-icons/hi';
import {useAuth} from '../context/AuthContext';
import { getPatients, getIncidents } from '../utils/dataUtils';
import PatientList from '../components/dashboard/PatientList';
import UpcomingAppointments from '../components/dashboard/UpcomingAppointments';
import StatsCard from '../components/dashboard/StatsCard';
import RevenueChart from '../components/dashboard/RevenueChart';

const Dashboard = () => {
  const { user } = useAuth();
  const patients = getPatients();
  const incidents = getIncidents();
  
  // Filter incidents for patient view
  const patientIncidents = user?.role === 'Patient' 
    ? incidents.filter(i => i.patientId === user.patientId)
    : [];
  
  // Stats calculations
  const totalPatients = patients.length;
  const totalAppointments = incidents.length;
  const completedAppointments = incidents.filter(i => i.status === 'Completed').length;
  const totalRevenue = incidents.reduce((sum, i) => sum + (+i.cost || 0), 0);
  
  // Top patients by spending
  const topPatients = [...patients]
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 3);
  
  // Upcoming appointments (next 10)
  const now = new Date();
  const upcomingAppointments = incidents
    .filter(i => new Date(i.appointmentDate) > now && i.status === 'Scheduled')
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {user?.role === 'Admin' ? 'Dental Center Dashboard' : 'My Dental Appointments'}
        </h1>
        <p className="text-gray-600 mt-2">
          {user?.role === 'Admin' 
            ? 'Overview of your dental practice' 
            : 'Manage your upcoming appointments and view history'}
        </p>
      </div>
      
      {user?.role === 'Admin' ? (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard 
              title="Total Patients" 
              value={totalPatients} 
              icon={<HiUserGroup className="h-6 w-6 text-blue-500" />} 
              color="blue" 
            />
            <StatsCard 
              title="Appointments" 
              value={totalAppointments} 
              icon={<HiCalendar className="h-6 w-6 text-cyan-500" />} 
              color="cyan" 
            />
            <StatsCard 
              title="Completed" 
              value={completedAppointments} 
              icon={<HiCheckCircle className="h-6 w-6 text-green-500" />} 
              color="green" 
            />
            <StatsCard 
              title="Total Revenue" 
              value={`$${totalRevenue}`} 
              icon={<HiCurrencyDollar className="h-6 w-6 text-purple-500" />} 
              color="purple" 
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue Chart */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Revenue Overview</h2>
                  <div className="flex items-center text-sm text-gray-500">
                    <HiChartBar className="mr-1" />
                    <span>Last 6 months</span>
                  </div>
                </div>
                <RevenueChart />
              </div>
            </div>
            
            {/* Top Patients */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Patients</h2>
              <div className="space-y-4">
                {topPatients.map((patient, index) => (
                  <motion.div 
                    key={patient.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="bg-blue-100 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        {patient.avatar}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-800">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient.lastVisit}</div>
                      </div>
                    </div>
                    <div className="font-semibold text-gray-800">${patient.totalSpent}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
              <UpcomingAppointments appointments={upcomingAppointments} />
            </div>
            
            {/* Recent Patients */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Patients</h2>
              <PatientList patients={patients.slice(0, 5)} />
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">My Upcoming Appointments</h2>
          {patientIncidents.length > 0 ? (
            <UpcomingAppointments appointments={patientIncidents} />
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiCalendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No upcoming appointments</h3>
              <p className="text-gray-500">Schedule your next dental appointment</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;