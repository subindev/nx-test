import React from 'react';

const Marker = ({ lat, lng, text }) => (
  <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
    <div style={{ backgroundColor: 'white', borderRadius: '50%', padding: '5px', boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.5)' }}>
      <p style={{ margin: 0 }}>{text}</p>
    </div>
    <i className="fas fa-map-marker-alt" style={{ fontSize: '24px', color: '#c70039' }} />
  </div>
);

export default Marker;
