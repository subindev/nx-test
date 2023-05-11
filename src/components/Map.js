import React, { useEffect, useRef } from 'react';

function GoogleMap({ apiKey, zoom, center }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [apiKey]);

  function initMap() {
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: zoom,
      center: center,
    });
  }

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
}

export default GoogleMap;
