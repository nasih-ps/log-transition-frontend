// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ServiceTaskOverview = () => {
//   const [selectedServices, setSelectedServices] = useState([]);
//   const [expandedService, setExpandedService] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Retrieve selected services from local storage
//     const storedServices = JSON.parse(localStorage.getItem('selectedServices') || '[]');
//     setSelectedServices(storedServices.map(service => ({
//       ...service,
//       tasks: service.tasks || []
//     })));
//   }, []);

//   const handleAddTask = (service) => {
//     navigate('/service-task-management', { 
//       state: { 
//         service: service,
//         mode: 'add'
//       } 
//     });
//   };

//   const handleEditTask = (service, task) => {
//     navigate('/service-task-management', { 
//       state: { 
//         service: service,
//         task: task,
//         mode: 'edit'
//       } 
//     });
//   };

//   const toggleServiceExpansion = (service) => {
//     setExpandedService(expandedService?.id === service.id ? null : service);
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'Active': return 'bg-green-100 text-green-800 border-green-300';
//       case 'Pending': return 'bg-orange-100 text-orange-800 border-orange-300';
//       default: return 'bg-gray-100 text-gray-800 border-gray-300';
//     }
//   };

//   const getPriorityColor = (level) => {
//     switch(level) {
//       case 'High': return 'text-red-600';
//       case 'Critical': return 'text-orange-600';
//       case 'Medium': return 'text-green-600';
//       case 'Low': return 'text-green-500';
//       default: return 'text-gray-600';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
//         <div className="p-6 border-b">
//           <h1 className="text-2xl font-bold text-center text-gray-700">Services and Tasks Overview</h1>
//         </div>

//         {selectedServices.map((service) => (
//           <div key={service.id} className="p-4 border-b">
//             <div 
//               className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-3 rounded"
//               onClick={() => toggleServiceExpansion(service)}
//             >
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-800">{service.name}</h2>
//                 <p className="text-sm text-gray-600">
//                   Service Type: {service.type} | 
//                   Priority: <span className={getPriorityColor(service.level)}>{service.level}</span>
//                 </p>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <span className="text-blue-600">{service.tasks.length} Tasks</span>
//                 <button 
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleAddTask(service);
//                   }}
//                   className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
//                 >
//                   + Add Task
//                 </button>
//               </div>
//             </div>

//             {expandedService?.id === service.id && (
//               <div className="mt-4 bg-gray-50 rounded-lg p-4">
//                 {service.tasks.length === 0 ? (
//                   <p className="text-center text-gray-500">No tasks for this service</p>
//                 ) : (
//                   <table className="w-full">
//                     <thead className="bg-blue-100">
//                       <tr>
//                         <th className="p-2 text-left">Task</th>
//                         <th className="p-2 text-center">Status</th>
//                         <th className="p-2 text-center">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {service.tasks.map((task, index) => (
//                         <tr key={index} className="border-b">
//                           <td className="p-2">{task.name}</td>
//                           <td className="p-2 text-center">
//                             <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
//                               {task.status}
//                             </span>
//                           </td>
//                           <td className="p-2 flex justify-center space-x-2">
//                             <button 
//                               onClick={() => handleEditTask(service, task)}
//                               className="text-blue-500 hover:bg-blue-100 p-2 rounded"
//                             >
//                               ✎
//                             </button>
//                             <button 
//                               className="text-red-500 hover:bg-red-100 p-2 rounded"
//                             >
//                               ✖
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}

//         <div className="p-6 flex justify-end">
//           <button 
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceTaskOverview;