// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const ServiceTaskManagement = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [service, setService] = useState(null);
//   const [task, setTask] = useState({
//     name: '',
//     description: '',
//     status: 'Pending'
//   });
//   const [mode, setMode] = useState('add');

//   useEffect(() => {
//     if (location.state) {
//       setService(location.state.service);
//       setMode(location.state.mode);

//       if (location.state.mode === 'edit' && location.state.task) {
//         setTask(location.state.task);
//       }
//     } else {
//       // If no state is passed, redirect back
//       navigate('/service-task-overview');
//     }
//   }, [location, navigate]);

//   const handleSave = () => {
//     // Retrieve current selected services
//     const selectedServices = JSON.parse(localStorage.getItem('selectedServices') || '[]');
    
//     // Find the service and update its tasks
//     const updatedServices = selectedServices.map(s => {
//       if (s.id === service.id) {
//         const updatedTasks = mode === 'edit' 
//           ? s.tasks.map(t => t.name === task.name ? task : t)
//           : [...(s.tasks || []), task];
        
//         return { 
//           ...s, 
//           tasks: updatedTasks 
//         };
//       }
//       return s;
//     });

//     // Save updated services
//     localStorage.setItem('selectedServices', JSON.stringify(updatedServices));

//     // Navigate back to overview
//     navigate('/service-task-overview');
//   };

//   const handleCancel = () => {
//     navigate('/service-task-overview');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
//       <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           {mode === 'add' ? 'Add New Task' : 'Edit Task'}
//         </h2>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2">Service:</label>
//           <input 
//             type="text" 
//             value={service?.name || ''} 
//             readOnly 
//             className="w-full px-3 py-2 bg-gray-100 border rounded-md text-gray-700"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2">Task Name:</label>
//           <input 
//             type="text" 
//             value={task.name}
//             onChange={(e) => setTask({...task, name: e.target.value})}
//             placeholder="Enter task name"
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2">Description:</label>
//           <textarea 
//             value={task.description}
//             onChange={(e) => setTask({...task, description: e.target.value})}
//             placeholder="Enter task description"
//             rows={4}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2">Status:</label>
//           <select
//             value={task.status}
//             onChange={(e) => setTask({...task, status: e.target.value})}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="Pending">Pending</option>
//             <option value="Active">Active</option>
//           </select>
//         </div>

//         <div className="flex justify-between space-x-4">
//           <button 
//             onClick={handleCancel}
//             className="w-1/2 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//           <button 
//             onClick={handleSave}
//             disabled={!task.name}
//             className={`w-1/2 text-white py-3 rounded-lg 
//               ${task.name 
//                 ? 'bg-blue-600 hover:bg-blue-700' 
//                 : 'bg-gray-400 cursor-not-allowed'}`}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//  );
// };

// export default ServiceTaskManagement;


import React, { useState } from 'react';
 
const ServicesTasksManager = () => {
  const [services, setServices] = useState([
    {
      name: 'Network Monitoring',
      tasks: [
 
      ]
    },
    {
      name: 'Security Log Analysis',
      tasks: []
    }
  ]);
 
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [newTask, setNewTask] = useState({ name: '', description: '' });
 
  const handleDeleteTask = (serviceIndex, taskIndex) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex].tasks.splice(taskIndex, 1);
    setServices(updatedServices);
  };
 
  const handleAddTask = () => {
    if (!selectedService || !newTask.name) return;
 
    const updatedServices = services.map(service => {
      if (service.name === selectedService) {
        return {
          ...service,
          tasks: [
            ...service.tasks,
            {
              id: Math.max(...service.tasks.map(t => t.id)) + 1,
              name: newTask.name,
              status: 'Pending'
            }
          ]
        };
      }
      return service;
    });
 
    setServices(updatedServices);
    setShowAddTask(false);
    setNewTask({ name: '', description: '' });
  };
 
  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>
        Services and Tasks Manager
      </h1>
 
      {services.map((service, serviceIndex) => (
        <div
          key={service.name}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            marginBottom: '20px',
            padding: '15px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div>
              <h2 style={{ margin: '0', fontSize: '20px' }}>{service.name}</h2>
              <p style={{ margin: '5px 0', color: '#555' }}>
                Type: {service.type} | Priority: {service.priority}
              </p>
            </div>
            <button
              style={{
                padding: '8px 12px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSelectedService(service.name);
                setShowAddTask(true);
              }}
            >
              + Add Task
            </button>
          </div>
 
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Task</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Status</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {service.tasks.map((task, taskIndex) => (
                <tr key={task.id}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{task.name}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{task.status}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <button
                      style={{
                        marginRight: '5px',
                        padding: '5px 10px',
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                      title="Edit"
                    >
                      ✎
                    </button>
                    <button
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                      title="Delete"
                      onClick={() => handleDeleteTask(serviceIndex, taskIndex)}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
 
      {showAddTask && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', width: '400px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Add New Task</h2>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Service:</label>
              <input
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                value={selectedService}
                disabled
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Task Name:</label>
              <input
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                placeholder="Enter task name"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
              <textarea
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  height: '80px',
                }}
                placeholder="Enter task description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setShowAddTask(false);
                  setNewTask({ name: '', description: '' });
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onClick={handleAddTask}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default ServicesTasksManager;



const handleAddTask = async () => {
  if (!selectedService || !newTask.name) return;

  const service = services.find(s => s.name === selectedService);
  if (!service) return;

  // Find the corresponding service from the original selectedServices
  const matchingService = selectedServices.find(
    s => s.Service_Offerings_Major === selectedService
  );

  // Ensure we have the correct service_id
  if (!matchingService) {
    console.error('Matching service not found');
    return;
  }

  const taskData = {
    name: newTask.name,
    description: newTask.description || null, // Use null if description is empty
    service_id: matchingService.id, // Use the ID from the original service
    user_id: 1, // Assuming user_id is 1 or comes from your authentication context
    status: 'pending', // Changed to lowercase to match backend expectations
  };

  try {
    const response = await fetch('http://localhost:8000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      // Log more detailed error information
      const errorBody = await response.text();
      console.error('Error response:', errorBody);
      throw new Error('Failed to create task');
    }

    const task = await response.json();

    // Update the service's tasks with the new task
    const updatedServices = services.map(service => {
      if (service.name === selectedService) {
        return {
          ...service,
          tasks: [
            ...service.tasks,
            {
              id: task.id,
              name: task.name,
              description: task.description,
              status: task.status,
            },
          ],
        };
      }
      return service;
    });

    setServices(updatedServices);
    setShowAddTask(false);
    setNewTask({ name: '', description: '' });
  } catch (error) {
    console.error('Error adding task:', error);
    // Optionally, show an error message to the user
    alert('Failed to add task. Please try again.');
  }
};