import React from 'react';
import { 
  Box, 
  CssBaseline, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Typography 
} from '@mui/material';
import { 
  Home as HomeIcon, 
  ListAlt as CatalogIcon, 
  Assignment as TaskIcon, 
  Timeline as WavesIcon, 
  Map as TransitionIcon 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const steps = [
  { 
    name: 'Home', 
    icon: <HomeIcon />, 
    route: '/home',
    step: 1 
  },
  { 
    name: 'Service Catalog', 
    icon: <CatalogIcon />, 
    route: '/service-catalog',
    step: 2 
  },
  { 
    name: 'Task Generation', 
    icon: <TaskIcon />, 
    route: '/service-task',
    step: 3 
  },
  { 
    name: 'Waves and Tracks', 
    icon: <WavesIcon />, 
    route: '/waves-tracks',
    step: 4 
  },
  { 
    name: 'Transition Plan', 
    icon: <TransitionIcon />, 
    route: '/transition-plan',
    step: 5 
  }
];

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCompletedSteps = (currentRoute) => {
    const currentStepIndex = steps.findIndex(step => step.route === currentRoute);
    return steps.map((step, index) => ({
      ...step,
      completed: index < currentStepIndex
    }));
  };

  const currentSteps = getCompletedSteps(location.pathname);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f0f4f8',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#2c3e50',
              textAlign: 'center',
              width: '100%'
            }}
          >
            Project Workflow
          </Typography>
        </Toolbar>
        <List>
          {currentSteps.map((step) => (
            <ListItem 
              key={step.name}
              button
              onClick={() => navigate(step.route)}
              sx={{
                backgroundColor: location.pathname === step.route 
                  ? '#e0e7ff' 
                  : step.completed 
                  ? '#e6f3ff' 
                  : 'transparent',
                margin: '8px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f0f5ff',
                }
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: location.pathname === step.route 
                    ? '#3b82f6' 
                    : step.completed 
                    ? '#4ade80' 
                    : 'inherit' 
                }}
              >
                {step.icon}
              </ListItemIcon>
              <ListItemText 
                primary={`Step ${step.step}: ${step.name}`}
                primaryTypographyProps={{
                  color: location.pathname === step.route 
                    ? '#3b82f6' 
                    : step.completed 
                    ? '#4ade80' 
                    : 'inherit'
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f8fafc',
          p: 3,
          minHeight: '100vh',
          transition: 'margin 0.3s ease'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;