import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton,
  Chip,
  DialogContentText
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const ServicesTasksManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedServices } = location.state || { selectedServices: [] };

  const [services, setServices] = useState(
    selectedServices.map((service) => ({
      id: service.id,
      name: service.Service_Offerings_Major,
      type: service.Service_Type,
      tasks: [],
    }))
  );

  const [showAddTask, setShowAddTask] = useState(false);
  const [showServiceAnalysis, setShowServiceAnalysis] = useState(false);
  const [serviceAnalysis, setServiceAnalysis] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [newTask, setNewTask] = useState({ name: '', description: '' });
  const [userId] = useState(1);

  useEffect(() => {
    const fetchTasksForServices = async () => {
      try {
        const updatedServices = await Promise.all(
          services.map(async (service) => {
            const response = await fetch(
              `http://localhost:8000/tasks/${userId}/${service.id}`
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch tasks for service ${service.name}`);
            }
            const tasks = await response.json();
            return {
              ...service,
              tasks: tasks || [],
            };
          })
        );
        setServices(updatedServices);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasksForServices();
  }, [userId, services]);

  const handleGenerateServiceAnalysis = async (serviceId) => {
    try {
      const response = await fetch(`http://localhost:8000/service-analysis/${userId}/${serviceId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch service analysis');
      }
      const analysis = await response.text();
      setServiceAnalysis(analysis);
      setShowServiceAnalysis(true);
    } catch (error) {
      console.error('Error generating service analysis:', error);
    }
  };


  const handleDeleteTask = (serviceIndex, taskIndex) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex].tasks.splice(taskIndex, 1);
    setServices(updatedServices);
  };

  const handleAddTask = async () => {
    if (!selectedService || !newTask.name) return;

    const service = services.find((s) => s.name === selectedService);
    if (!service) return;

    const taskData = {
      name: newTask.name,
      description: newTask.description,
      service_id: service.id,
      user_id: userId,
      status: 'Pending',
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
        throw new Error('Failed to create task');
      }

      const task = await response.json();

      const updatedServices = services.map((service) => {
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
    }
  };

  const handleSaveAndNext = () => {
    navigate('/waves-tracks', { state: { selectedServices } });
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h2" align="center" gutterBottom>
          Services and Tasks Manager
        </Typography>

        <Grid container spacing={3}>
          {services.map((service, serviceIndex) => (
            <Grid item xs={12} key={service.name}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Box>
                      <Typography variant="h6" component="h2">
                        {service.name}
                      </Typography>
                      <Chip 
                        label={service.type} 
                        color="primary" 
                        size="small" 
                        variant="outlined" 
                      />
                    </Box>
                    <Box display="flex" gap={2}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      startIcon={<AddIcon />}
                      onClick={() => {
                        setSelectedService(service.name);
                        setShowAddTask(true);
                      }}
                    >
                      Add Task
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        startIcon={<AnalyticsIcon />}
                        onClick={() => handleGenerateServiceAnalysis(service.id)}
                      >
                        Generate Service Analysis
                      </Button>
                    </Box>
                  </Box>

                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Task</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {service.tasks.map((task, taskIndex) => (
                          <TableRow key={task.id}>
                            <TableCell>{task.name}</TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>
                              <IconButton color="primary" size="small">
                                <EditIcon />
                              </IconButton>
                              <IconButton 
                                color="error" 
                                size="small"
                                onClick={() => handleDeleteTask(serviceIndex, taskIndex)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Service Analysis Dialog */}
        <Dialog
          open={showServiceAnalysis}
          onClose={() => setShowServiceAnalysis(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Service Analysis</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {serviceAnalysis}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setShowServiceAnalysis(false)} 
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog 
          open={showAddTask} 
          onClose={() => setShowAddTask(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Add New Task</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Service"
              fullWidth
              value={selectedService}
              disabled
            />
            <TextField
              margin="dense"
              label="Task Name"
              fullWidth
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAddTask(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddTask} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button 
            variant="contained" 
            color="success"
            onClick={handleSaveAndNext}
          >
            Save and Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ServicesTasksManager;