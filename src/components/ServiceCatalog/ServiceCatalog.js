import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Checkbox, 
  Button, 
  Box, 
  Chip 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ServiceCatalog = () => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:8000/services');
      const data = await response.json();
      setServices(data);

      const initialSelectedState = data.reduce((acc, service) => {
        acc[service.id] = false;
        return acc;
      }, {});
      setSelectedServices(initialSelectedState);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleServiceSelect = (serviceId) => {
    setSelectedServices((prevState) => ({
      ...prevState,
      [serviceId]: !prevState[serviceId],
    }));
  };

  const handleSubmit = async () => {
    const selectedServiceList = services.filter(
      (service) => selectedServices[service.id]
    );

    if (selectedServiceList.length === 0) {
      alert('Please select at least one service');
      return;
    }
    
    navigate('/service-task', { state: { selectedServices: selectedServiceList } });
  };

  const selectedCount = Object.values(selectedServices).filter(Boolean).length;

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Service Catalog Selection
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle1">
            Selected Services: {selectedCount}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit}
            disabled={selectedCount === 0}
          >
            Save and Next
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>Service Offerings Major</TableCell>
                <TableCell>Service Type</TableCell>
                <TableCell>Service Level</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service) => {
                const isSelected = selectedServices[service.id] || false;
                return (
                  <TableRow 
                    key={service.id} 
                    hover 
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleServiceSelect(service.id)}
                      />
                    </TableCell>
                    <TableCell>{service.Service_Offerings_Major}</TableCell>
                    <TableCell>
                      <Chip 
                        label={service.Service_Type} 
                        color="primary" 
                        size="small" 
                        variant="outlined" 
                      />
                    </TableCell>
                    <TableCell>{service.Service_Level}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ServiceCatalog;