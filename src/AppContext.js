import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { HubConnectionBuilder } from '@microsoft/signalr';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ id: 24 }); // Initialize with userId 24
  const [userPreferences, setUserPreferences] = useState(null);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    // Fetch user preferences based on the userId from the local state
    if (!userPreferences) {
      axios
        .get(`https://gd-rms-api.azurewebsites.net/api/UserConfiguration/${user.id}`)
        .then((userConfigResponse) => {
          setUserPreferences(userConfigResponse.data);

          const assetTypeId = userConfigResponse.data.homeConfiguration.assetType.id;
          // Fetch assets based on the assetTypeId
          axios
            .get(`https://gd-rms-api.azurewebsites.net/api/Asset?assetId=${assetTypeId}`)
            .then((assetResponse) => {
              setAssets(assetResponse.data);
            })
            .catch((error) => {
              console.error('Error fetching assets:', error);
            });
        })
        .catch((error) => {
          console.error('Error fetching user preferences:', error);
        });
    }
  }, [user, userPreferences]);

  // Set up SignalR connection here
  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl('https://gd-rms-fn.azurewebsites.net/api')
      .build();

    connection.on('rmsReceived', (data) => {
      // Update the relevant asset's parameter value in the assets state
      setAssets((prevAssets) =>
        prevAssets.map((asset) => {
          // Check if the asset has the parameter with the matching deviceId and sensorId
          const updatedParameters = asset.parameters.map((param) => {
            if (param.deviceId === data.deviceId && param.sensorId === data.sensorId) {
              // Update the parameter's value with the value from the SignalR data
              return { ...param, value: parseFloat(data.values[param.id]?.Value) };
            }
            return param;
          });

          // Return the updated asset with the updated parameters
          return { ...asset, parameters: updatedParameters };
        })
      );
    });

    connection.start().catch((error) => console.error('Error starting SignalR connection:', error));

    return () => {
      connection.stop().catch((error) => console.error('Error stopping SignalR connection:', error));
    };
  }, []);

  return (
    <AppContext.Provider value={{ user, userPreferences, assets }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
