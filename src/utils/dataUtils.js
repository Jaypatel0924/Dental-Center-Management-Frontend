
export const initializeData = () => {
  if (!localStorage.getItem('initialized')) {
    const initialData = {
      users: [
        { 
          id: "1", 
          role: "Admin", 
          email: "admin@entnt.in", 
          password: "admin123",
          name: "Dr. Sarah Johnson",
          avatar: "SA"
        },
        { 
          id: "2", 
          role: "Patient", 
          email: "john@entnt.in", 
          password: "patient123", 
          patientId: "p1",
          name: "John Doe",
          avatar: "JD"
        }
      ],
      patients: [
        {
          id: "p1",
          name: "John Doe",
          dob: "1990-05-10",
          contact: "1234567890",
          email: "john@entnt.in",
          address: "123 Main St, New York",
          healthInfo: "No allergies. Sensitive to cold drinks.",
          lastVisit: "2023-06-15",
          nextAppointment: "2023-07-10",
          totalSpent: 1200,
          avatar: "JD"
        }
      ],
      incidents: [
        {
          id: "i1",
          patientId: "p1",
          title: "Toothache",
          description: "Upper molar pain",
          comments: "Sensitive to cold. Possible cavity detected.",
          appointmentDate: "2023-07-01T10:00:00",
          cost: 80,
          status: "Completed",
          treatment: "Filling",
          nextDate: "2023-10-01",
          files: []
        }
      ]
    };

    localStorage.setItem('users', JSON.stringify(initialData.users));
    localStorage.setItem('patients', JSON.stringify(initialData.patients));
    localStorage.setItem('incidents', JSON.stringify(initialData.incidents));
    localStorage.setItem('initialized', 'true');
  }
};

export const getPatients = () => {
  return JSON.parse(localStorage.getItem('patients')) || [];
};

export const getIncidents = () => {
  return JSON.parse(localStorage.getItem('incidents')) || [];
};

export const savePatients = (patients) => {
  localStorage.setItem('patients', JSON.stringify(patients));
};

export const saveIncidents = (incidents) => {
  localStorage.setItem('incidents', JSON.stringify(incidents));
};