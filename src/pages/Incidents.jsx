
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { HiPlus, HiPencil, HiTrash, HiSearch, HiCalendar } from 'react-icons/hi';
// import { getIncidents, getPatients, saveIncidents } from '../utils/dataUtils';
// import IncidentForm from './IncidentForm';
// import { format } from 'date-fns';

// const Incidents = () => {
//   const [incidents, setIncidents] = useState([]);
//   const [filteredIncidents, setFilteredIncidents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showForm, setShowForm] = useState(false);
//   const [selectedIncident, setSelectedIncident] = useState(null);
//   const patients = getPatients();

//   const incidentsData = getIncidents();
//   useEffect(() => {
//     setIncidents(incidentsData);
//     setFilteredIncidents(incidentsData);
//   }, []);

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = incidents.filter(incident => {
//         const patient = patients.find(p => p.id === incident.patientId);
//         return (
//           incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (patient && patient.name.toLowerCase().includes(searchTerm.toLowerCase()))
//         );
//       });
//       setFilteredIncidents(filtered);
//     } else {
//       setFilteredIncidents(incidents);
//     }
//   }, [searchTerm, incidents, patients]);

//   const getPatientName = (patientId) => {
//     const patient = patients.find(p => p.id === patientId);
//     return patient ? patient.name : 'Unknown';
//   };

//   const handleDelete = (id) => {
//     const updatedIncidents = incidents.filter(incident => incident.id !== id);
//     setIncidents(updatedIncidents);
//     setFilteredIncidents(updatedIncidents);
//     saveIncidents(updatedIncidents);
//   };

//   const handleSave = (updatedIncidents) => {
//     setIncidents(updatedIncidents);
//     setFilteredIncidents(updatedIncidents);
//     setShowForm(false);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="container mx-auto"
//     >
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Appointment Management</h1>
//           <p className="text-gray-600 mt-2">View and manage all dental appointments</p>
//         </div>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => {
//             setSelectedIncident(null);
//             setShowForm(true);
//           }}
//           className="mt-4 md:mt-0 flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow-md"
//         >
//           <HiPlus className="mr-2" />
//           Add New Appointment
//         </motion.button>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <HiSearch className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search appointments by title or patient name..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
//           />
//         </div>
//       </div>

//       {showForm ? (
//         <IncidentForm 
//           incident={selectedIncident} 
//           onClose={() => {
//             setShowForm(false);
//             setSelectedIncident(null);
//           }} 
//           onSave={handleSave}
//         />
//       ) : (
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
//                   <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredIncidents.length === 0 ? (
//                   <tr>
//                     <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
//                       No appointments found. Add a new appointment to get started.
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredIncidents.map((incident, index) => (
//                     <motion.tr 
//                       key={incident.id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.05 }}
//                       className="hover:bg-gray-50"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">{incident.title}</div>
//                         <div className="text-sm text-gray-500">{incident.description}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{getPatientName(incident.patientId)}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center text-sm text-gray-500">
//                           <HiCalendar className="mr-2 text-cyan-500" />
//                           {format(new Date(incident.appointmentDate), 'MMM dd, yyyy h:mm a')}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           incident.status === 'Scheduled' 
//                             ? 'bg-blue-100 text-blue-800' 
//                             : incident.status === 'Completed'
//                               ? 'bg-green-100 text-green-800'
//                               : 'bg-yellow-100 text-yellow-800'
//                         }`}>
//                           {incident.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {incident.cost ?`$${incident.cost}` : '-'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => {
//                             setSelectedIncident(incident);
//                             setShowForm(true);
//                           }}
//                           className="text-cyan-600 hover:text-cyan-900 mr-4"
//                         >
//                           <HiPencil className="h-5 w-5" />
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => handleDelete(incident.id)}
//                           className="text-red-600 hover:text-red-900"
//                         >
//                           <HiTrash className="h-5 w-5" />
//                         </motion.button>
//                       </td>
//                     </motion.tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default Incidents;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash, HiSearch, HiCalendar } from 'react-icons/hi';
import { getIncidents, getPatients, saveIncidents } from '../utils/dataUtils';
import IncidentForm from './IncidentForm';
import { format } from 'date-fns';

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const patients = getPatients();

  useEffect(() => {
    const incidentsData = getIncidents();
    setIncidents(incidentsData);
    setFilteredIncidents(incidentsData);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = incidents.filter(incident => {
        const patient = patients.find(p => p.id === incident.patientId);
        return (
          incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (patient && patient.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
      setFilteredIncidents(filtered);
    } else {
      setFilteredIncidents(incidents);
    }
  }, [searchTerm, incidents, patients]);

  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown';
  };

  const handleDelete = (id) => {
    const updatedIncidents = incidents.filter(incident => incident.id !== id);
    setIncidents(updatedIncidents);
    setFilteredIncidents(updatedIncidents);
    saveIncidents(updatedIncidents);
  };

  const handleSave = (updatedIncidents) => {
    setIncidents(updatedIncidents);
    setFilteredIncidents(updatedIncidents);
    setShowForm(false);
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Appointment Management</h1>
          <p className="text-gray-600 mt-2">View and manage all dental appointments</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setSelectedIncident(null);
            setShowForm(true);
          }}
          className="mt-4 md:mt-0 flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow-md"
        >
          <HiPlus className="mr-2" />
          Add New Appointment
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
            placeholder="Search appointments by title or patient name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {showForm ? (
        <IncidentForm 
          incident={selectedIncident} 
          onClose={() => {
            setShowForm(false);
            setSelectedIncident(null);
          }} 
          onSave={handleSave}
        />
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredIncidents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No appointments found. Add a new appointment to get started.
                    </td>
                  </tr>
                ) : (
                  filteredIncidents.map((incident, index) => (
                    <motion.tr 
                      key={incident.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{incident.title}</div>
                        <div className="text-sm text-gray-500">{incident.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{getPatientName(incident.patientId)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <HiCalendar className="mr-2 text-cyan-500" />
                          {format(new Date(incident.appointmentDate), 'MMM dd, yyyy h:mm a')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          incident.status === 'Scheduled' 
                            ? 'bg-blue-100 text-blue-800' 
                            : incident.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {incident.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {incident.cost ?` $${incident.cost}` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setSelectedIncident(incident);
                            setShowForm(true);
                          }}
                          className="text-cyan-600 hover:text-cyan-900 mr-4"
                        >
                          <HiPencil className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(incident.id)}
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

export default Incidents;