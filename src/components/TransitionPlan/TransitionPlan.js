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
  Container,
  Tabs,
  Tab
} from '@mui/material';
import { useLocation } from 'react-router-dom';

const TransitionPlan = () => {
  const [transitionPlanData, setTransitionPlanData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();
  const { selectedServices } = location.state || { selectedServices: [] };

  // Static rows for each table
  const tableRows = [
    'KT Session',
    'Fwd Shadow',
    'Rev Shadow',
    'Cutover'
  ];

  useEffect(() => {
    if (selectedServices.length > 0) {
      processTransitionPlan(selectedServices);
    }
  }, [selectedServices]);

  const processTransitionPlan = (servicesData) => {
    // Group services by Service_Level and Service_Type
    const levelGroups = servicesData.reduce((acc, service) => {
      if (!acc[service.Service_Level]) {
        acc[service.Service_Level] = new Set();
      }
      acc[service.Service_Level].add(service.Service_Type);
      return acc;
    }, {});

    // Create transition plan data
    const planData = Object.entries(levelGroups).map(([level, serviceTypes]) => {
      const levelTables = Array.from(serviceTypes).map((serviceType, trackIndex) => {
        const tableData = tableRows.map((row, rowIndex) => ({
          wave: `Wave 2 - ${level}`,
          track: serviceType,
          activity: row,
          sprint: `Sprint${level.replace('Level ', '')}..${trackIndex + 1}`,
          timeline: row === 'Cutover' ? '1 day' : '3 days'
        }));
        return tableData;
      });
      
      return {
        level,
        tables: levelTables
      };
    });

    setTransitionPlanData(planData);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography 
          variant="h2" 
          gutterBottom 
          align="center" 
          sx={{ mb: 3 }}
        >
          Transition Plan
        </Typography>

        {transitionPlanData.length > 0 && (
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              variant="scrollable"
              scrollButtons="auto"
            >
              {transitionPlanData.map((levelData, index) => (
                <Tab 
                  key={levelData.level} 
                  label={`Level ${index + 1} Transition Plan`} 
                />
              ))}
            </Tabs>
          </Box>
        )}

        {transitionPlanData.map((levelData, levelIndex) => (
          activeTab === levelIndex && (
            <Box key={levelData.level}>
              {levelData.tables.map((tableData, tableIndex) => (
                <TableContainer 
                  component={Paper} 
                  variant="outlined" 
                  sx={{ mb: 3 }}
                  key={tableIndex}
                >
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
                        <TableCell 
                          sx={{ 
                            fontWeight: 'bold', 
                            backgroundColor: (theme) => theme.palette.grey[100] 
                          }}
                        >
                          Track
                        </TableCell>
                        <TableCell 
                          sx={{ 
                            fontWeight: 'bold', 
                            backgroundColor: (theme) => theme.palette.grey[100] 
                          }}
                        >
                          Activity
                        </TableCell>
                        <TableCell 
                          sx={{ 
                            fontWeight: 'bold', 
                            backgroundColor: (theme) => theme.palette.grey[100] 
                          }}
                        >
                          Sprint
                        </TableCell>
                        <TableCell 
                          sx={{ 
                            fontWeight: 'bold', 
                            backgroundColor: (theme) => theme.palette.grey[100] 
                          }}
                        >
                          Timeline
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          <TableCell>{row.wave}</TableCell>
                          <TableCell>{row.track}</TableCell>
                          <TableCell>{row.activity}</TableCell>
                          <TableCell>{row.sprint}</TableCell>
                          <TableCell>{row.timeline}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ))}
            </Box>
          )
        ))}
      </Paper>
    </Container>
  );
};

export default TransitionPlan;