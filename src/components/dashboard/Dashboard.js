import React, { useContext, useEffect, useState } from 'react';
import TruckList from './TruckList';
import GoogleMap from './Map';
import AlarmPanel from './AlarmPanel';
import './dashboard.css';
import * as signalR from '@microsoft/signalr';
import { RealtimeContext } from '../../realtime-context';

function Dashboard() {
  const { setData } = useContext(RealtimeContext);
  const [connection, setConnection] = useState(null);
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://gd-rms-fn.azurewebsites.net/api')
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('SignalR Connected!');

          connection.on('rmsReceived', message => {
            setData(message);
          });
        })
        .catch(err => console.log('SignalR Connection Error: ', err));
    }
  }, [connection]);
  
  return (
    <div className="dashboard-container">
      <div className="truck-list-container">
        <TruckList />
      </div>
      <div className="map-container">
        <GoogleMap apiKey="AIzaSyDk4nhM7mTQcI-i0nWXpVVsPppH__-ROdk" zoom={12} center={{ lat: 37.7749, lng: -122.4194 }} />
      </div>
      <div className="alarm-panel-container">
        <AlarmPanel />
      </div>
    </div>
  );
}

export default Dashboard;
