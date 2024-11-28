import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  Container
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const WavesAndTracks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedServices } = location.state || { selectedServices: [] };

  const [wavesAndTracksData, setWavesAndTracksData] = useState([]);

  useEffect(() => {
    if (selectedServices.length > 0) {
      processWavesAndTracks(selectedServices);
    }
  }, [selectedServices]);

  const processWavesAndTracks = (servicesData) => {
    // Group services by Service_Level (Waves)
    const waveGroups = servicesData.reduce((acc, selectedService) => {
      if (!acc[selectedService.Service_Level]) {
        acc[selectedService.Service_Level] = new Set();
      }
      acc[selectedService.Service_Level].add(selectedService.Service_Type);
      return acc;
    }, {});

    // Transform the grouped data into a format suitable for the table
    const tableData = Object.entries(waveGroups).map(([wave, serviceTypes]) => {
      const rowData = { Wave: wave };

      // Convert Set to Array and sort
      const sortedServiceTypes = Array.from(serviceTypes).sort();

      // Assign service types to Track columns
      sortedServiceTypes.forEach((serviceType, index) => {
        rowData[`Track${index + 1}`] = serviceType;
      });

      return rowData;
    });

    setWavesAndTracksData(tableData);
  };

  // Determine the max number of tracks to dynamically generate table headers
  const getMaxTracks = () => {
    return Math.max(...wavesAndTracksData.map(row => 
      Object.keys(row).filter(key => key.startsWith('Track')).length
    ), 0);
  };

  // Handle Next button click
  const handleNext = () => {
    navigate('/transition-plan', { state: { selectedServices } });
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          align="center" 
          sx={{ mb: 3 }}
        >
          Waves and Tracks
        </Typography>

        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell 
                  sx={{ 
                    fontWeight: 'bold', 
                    backgroundColor: (theme) => theme.palette.grey[100] 
                  }}
                >
                  Wave
                </TableCell>
                {[...Array(getMaxTracks())].map((_, index) => (
                  <TableCell 
                    key={`track-header-${index}`}
                    sx={{ 
                      fontWeight: 'bold', 
                      backgroundColor: (theme) => theme.palette.grey[100] 
                    }}
                  >
                    Track {index + 1}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {wavesAndTracksData.map((row, rowIndex) => (
                <TableRow key={`row-${rowIndex}`}>
                  <TableCell>{row.Wave}</TableCell>
                  {[...Array(getMaxTracks())].map((_, colIndex) => {
                    const trackKey = `Track${colIndex + 1}`;
                    return (
                      <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                        {row[trackKey] || '-'}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            mt: 3 
          }}
        >
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default WavesAndTracks;