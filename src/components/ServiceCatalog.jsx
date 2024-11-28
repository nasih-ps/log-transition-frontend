// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Box, 
//   Typography, 
//   Container, 
//   Paper, 
//   List, 
//   ListItem, 
//   ListItemText, 
//   Checkbox, 
//   Button, 
//   Chip,
//   createTheme, 
//   ThemeProvider 
// } from '@mui/material';

// // Custom theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//       light: '#42a5f5',
//     },
//     text: {
//       secondary: '#666666'
//     },
//     serviceLevel: {
//       high: '#d32f2f',      // Red
//       critical: '#f57c00',  // Orange
//       medium: '#2e7d32',    // Green
//       low: '#4caf50'        // Light Green
//     }
//   },
//   typography: {
//     fontFamily: 'Inter, Arial, sans-serif',
//     h1: {
//       fontSize: '1.5rem',
//       fontWeight: 700,
//     }
//   },
//   components: {
//     MuiListItem: {
//       styleOverrides: {
//         root: {
//           '&:hover': {
//             backgroundColor: 'rgba(0, 0, 0, 0.04)',
//           }
//         }
//       }
//     }
//   }
// });

// const services = [
//   {
//     id: 1,
//     name: 'Network Monitoring',
//     type: 'Infrastructure',
//     level: 'High'
//   },
//   {
//     id: 2,
//     name: 'Security Log Analysis',
//     type: 'Security',
//     level: 'Critical'
//   },
//   {
//     id: 3,
//     name: 'Performance Tracking',
//     type: 'Application',
//     level: 'Medium'
//   },
//   {
//     id: 4,
//     name: 'Error Log Aggregation',
//     type: 'System',
//     level: 'Low'
//   },
//   {
//     id: 5,
//     name: 'Access Log Monitoring',
//     type: 'Security',
//     level: 'High'
//   },
//   {
//     id: 6,
//     name: 'Incident Response Logging',
//     type: 'Emergency',
//     level: 'Critical'
//   }
// ];

// const ServiceCatalog = () => {
//   const [selectedServices, setSelectedServices] = useState([]);
//   const navigate = useNavigate();

//   const handleServiceSelect = (service) => {
//     const isSelected = selectedServices.find(s => s.id === service.id);
//     if (isSelected) {
//       setSelectedServices(selectedServices.filter(s => s.id !== service.id));
//     } else {
//       setSelectedServices([...selectedServices, service]);
//     }
//   };

//   const handleNext = () => {
//     // Store selected services in local storage
//     localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
//     // Navigate to Service Task Overview
//     navigate('/service-task-overview');
//   };

//   const getLevelColor = (level) => {
//     const colors = theme.palette.serviceLevel;
//     switch(level) {
//       case 'High': return colors.high;
//       case 'Critical': return colors.critical;
//       case 'Medium': return colors.medium;
//       case 'Low': return colors.low;
//       default: return theme.palette.text.secondary;
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container maxWidth="lg" sx={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         minHeight: '100vh',
//         backgroundColor: theme.palette.background.default
//       }}>
//         <Paper 
//           elevation={3} 
//           sx={{ 
//             width: '100%', 
//             maxWidth: 800, 
//             borderRadius: 2 
//           }}
//         >
//           <Box 
//             sx={{ 
//               p: 3, 
//               borderBottom: `1px solid ${theme.palette.divider}` 
//             }}
//           >
//             <Typography 
//               variant="h1" 
//               align="center" 
//               color="text.primary"
//             >
//               Incident Log Services Selection
//             </Typography>
//           </Box>
          
//           <List>
//             {services.map((service) => {
//               const isSelected = selectedServices.some(s => s.id === service.id);
              
//               return (
//                 <ListItem 
//                   key={service.id}
//                   onClick={() => handleServiceSelect(service)}
//                   sx={{
//                     cursor: 'pointer',
//                     backgroundColor: isSelected 
//                       ? theme.palette.primary.light + '14' 
//                       : 'transparent',
//                     '&:hover': {
//                       backgroundColor: theme.palette.primary.light + '0A'
//                     }
//                   }}
//                 >
//                   <Checkbox
//                     checked={isSelected}
//                     onChange={() => handleServiceSelect(service)}
//                     sx={{ mr: 2 }}
//                   />
//                   <ListItemText 
//                     primary={service.name}
//                     primaryTypographyProps={{ 
//                       fontWeight: 500 
//                     }}
//                   />
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Typography 
//                       variant="body2" 
//                       color="text.secondary"
//                     >
//                       {service.type}
//                     </Typography>
//                     <Chip 
//                       label={service.level} 
//                       size="small"
//                       sx={{ 
//                         fontWeight: 600,
//                         backgroundColor: getLevelColor(service.level) + '1A',
//                         color: getLevelColor(service.level)
//                       }}
//                     />
//                   </Box>
//                 </ListItem>
//               );
//             })}
//           </List>

//           <Box 
//             sx={{ 
//               p: 3, 
//               display: 'flex', 
//               justifyContent: 'flex-end',
//               borderTop: `1px solid ${theme.palette.divider}`
//             }}
//           >
//             <Button 
//               variant="contained" 
//               onClick={handleNext}
//               disabled={selectedServices.length === 0}
//               sx={{ 
//                 px: 4, 
//                 py: 1.5,
//                 borderRadius: 2
//               }}
//             >
//               Next
//             </Button>
//           </Box>
//         </Paper>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default ServiceCatalog;