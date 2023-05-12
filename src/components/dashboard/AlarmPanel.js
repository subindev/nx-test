import React from 'react';
import './alarm-panel.css';

function AlarmPanel() {
  const alarms = [
    {
      id: 1,
      description: 'Temperature sensor malfunction',
      location: 'Truck 1',
      time: 'May 10, 2023 10:30AM',
    },
    {
      id: 2,
      description: 'Engine failure detected',
      location: 'Truck 2',
      time: 'May 9, 2023 4:15PM',
    },
    {
      id: 3,
      description: 'Brake system warning',
      location: 'Truck 3',
      time: 'May 8, 2023 9:20AM',
    },
  ];

  return (
    <div className="alarm-panel-container">
      <h2>Alarms</h2>
      <div className="alarm-list">
        {alarms.map((alarm) => (
          <div key={alarm.id} className="alarm-card">
            <div className="alarm-card-header">
              <h3>{alarm.description}</h3>
              <span>{alarm.time}</span>
            </div>
            <div className="alarm-card-body">
              <p>Location: {alarm.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlarmPanel;
