import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';  // Import useNavigate and useLocation hooks
import './WavesAndTracks.css';

const WavesAndTracks = () => {
  const navigate = useNavigate();  // Create the navigate function
  const location = useLocation();  // Get location to retrieve the selected services
  const { selectedServices } = location.state || { selectedServices: [] };  // Get selected services from location state

  const [wavesAndTracksData, setWavesAndTracksData] = useState([]);

  useEffect(() => {
    
    if (selectedServices.length > 0) {
      processWavesAndTracks(selectedServices);  // Process waves and tracks using selected services
    }
  }, [selectedServices]);

  const processWavesAndTracks = (servicesData) => {
    // Group services by Service_Level (Waves)
    const waveGroups = servicesData.reduce((acc, selectedServices) => {
      if (!acc[selectedServices.Service_Level]) {
        acc[selectedServices.Service_Level] = new Set();
      }
      acc[selectedServices.Service_Level].add(selectedServices.Service_Type);
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

    setWavesAndTracksData(tableData);  // Set the processed waves and tracks data
  };

  // Determine the max number of tracks to dynamically generate table headers
  const getMaxTracks = () => {
    return Math.max(...wavesAndTracksData.map(row => 
      Object.keys(row).filter(key => key.startsWith('Track')).length
    ), 0);
  };

  // Handle Next button click
  const handleNext = () => {
    navigate('/transition-plan');  // Navigate to the "Transition Plan" page
  };

  return (
    <div className="waves-and-tracks-container">
      <h1 className="waves-and-tracks-title">Waves and Tracks</h1>
      <div className="waves-and-tracks-table-container">
        <table className="waves-and-tracks-table">
          <thead>
            <tr>
              <th className="waves-and-tracks-header">Wave</th>
              {[...Array(getMaxTracks())].map((_, index) => (
                <th key={`track-${index + 1}`} className="waves-and-tracks-header">
                  Track {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {wavesAndTracksData.map((row, rowIndex) => (
              <tr key={rowIndex} className="waves-and-tracks-row">
                <td className="waves-and-tracks-cell">{row.Wave}</td>
                {[...Array(getMaxTracks())].map((_, colIndex) => {
                  const trackKey = `Track${colIndex + 1}`;
                  return (
                    <td key={trackKey} className="waves-and-tracks-cell">
                      {row[trackKey] || '-'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save and Next buttons */}
      <div className="waves-and-tracks-buttons">
        <button
          className="waves-and-tracks-next-button"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WavesAndTracks;
