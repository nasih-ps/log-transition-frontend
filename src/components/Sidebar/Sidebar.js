// import React from 'react';
// import { 
//   Drawer, 
//   List, 
//   ListItem, 
//   ListItemIcon, 
//   ListItemText, 
//   Toolbar, 
//   Typography, 
//   Box 
// } from '@mui/material';
// import { 
//   Home as HomeIcon, 
//   ListAlt as CatalogIcon, 
//   Assignment as TaskIcon, 
//   Timeline as WavesIcon, 
//   Map as TransitionIcon 
// } from '@mui/icons-material';
// import { useNavigate, useLocation } from 'react-router-dom';

// const drawerWidth = 240;

// const steps = [
//   { 
//     name: 'Home', 
//     icon: <HomeIcon />, 
//     route: '/home',
//     step: 1 
//   },
//   { 
//     name: 'Service Catalog', 
//     icon: <CatalogIcon />, 
//     route: '/service-catalog',
//     step: 2 
//   },
//   { 
//     name: 'Task Generation', 
//     icon: <TaskIcon />, 
//     route: '/service-task',
//     step: 3 
//   },
//   { 
//     name: 'Waves and Tracks', 
//     icon: <WavesIcon />, 
//     route: '/waves-tracks',
//     step: 4 
//   },
//   { 
//     name: 'Transition Plan', 
//     icon: <TransitionIcon />, 
//     route: '/transition-plan',
//     step: 5 
//   }
// ];

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const getStepProgression = (currentRoute) => {
//     const currentStepIndex = steps.findIndex(step => step.route === currentRoute);
//     return steps.map((step, index) => ({
//       ...step,
//       status: index < currentStepIndex 
//         ? 'completed' 
//         : index === currentStepIndex 
//         ? 'active' 
//         : 'pending'
//     }));
//   };

//   const currentSteps = getStepProgression(location.pathname);

//   const getStepColor = (status) => {
//     switch(status) {
//       case 'completed': return '#4caf50';  // Green
//       case 'active': return '#2196f3';     // Blue
//       case 'pending': return '#bdbdbd';    // Gray
//       default: return '#bdbdbd';
//     }
//   };

//   return (
//     <Drawer
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: drawerWidth,
//           boxSizing: 'border-box',
//           backgroundColor: '#f5f5f5'
//         },
//       }}
//       variant="permanent"
//       anchor="left"
//     >
//       <Toolbar>
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: '100%',
//             backgroundColor: '#4caf50', // Update the color here
//             padding: '16px',
//             borderRadius: '8px',
//             marginBottom: '16px'
//           }}
//         >
//           <Typography 
//             variant="h6" 
//             noWrap 
//             component="div" 
//             sx={{ 
//               fontWeight: 'bold', 
//               color: '#fff', // Update the text color here
//               textAlign: 'center',
//               width: '100%'
//             }}
//           >
//             Workflow Manager
//           </Typography>
//         </Box>
//       </Toolbar>
//       <List>
//         {currentSteps.map((step, index) => (
//           <ListItem 
//             key={step.name}
//             button
//             onClick={() => navigate(step.route)}
//             sx={{
//               backgroundColor: step.status === 'active' 
//                 ? '#e3f2fd' 
//                 : step.status === 'completed' 
//                 ? '#e8f5e9' 
//                 : 'transparent',
//               margin: '8px',
//               borderRadius: '8px',
//               transition: 'all 0.3s ease',
//               '&:hover': {
//                 backgroundColor: step.status === 'active' 
//                   ? '#e1f5fe' 
//                   : step.status === 'completed' 
//                   ? '#dcedc8' 
//                   : '#f1f1f1'
//               }
//             }}
//           >
//             <ListItemIcon>
//               {step.icon}
//             </ListItemIcon>
//             <ListItemText 
//               primary={step.name} 
//               sx={{
//                 color: getStepColor(step.status),
//                 fontWeight: step.status === 'active' ? 'bold' : 'normal',
//               }}
//             />
//           </ListItem>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;