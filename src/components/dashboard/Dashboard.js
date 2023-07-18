import React from 'react';
import AlarmPanel from './AlarmPanel';
import './dashboard.css';
import AssetList from './AssetList';
import GoogleMap from './Map';

function Dashboard() {
  return (
    <>
      <div className="dashboard-container">
        <div className="truck-list-container">
          <AssetList />
        </div>
        <div className="map-container">
          <GoogleMap apiKey="AIzaSyDk4nhM7mTQcI-i0nWXpVVsPppH__-ROdk" zoom={12} center={{ lat: 37.7749, lng: -122.4194 }} />
        </div>
        <div className="alarm-panel-container">
          <AlarmPanel />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
