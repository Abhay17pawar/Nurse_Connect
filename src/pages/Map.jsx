import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AlertTriangle } from 'lucide-react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Map = () => {
  const [position, setPosition] = useState(null); 
  const [error, setError] = useState(null);

  const LocationMarker = () => {
    const map = useMap(); 

    useEffect(() => {
      if (position) {
        map.flyTo(position, 13); 
      }
    }, [position, map]);

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here.</Popup>
      </Marker>
    );
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]); 
      },
      (err) => {
        setError("Unable to retrieve your location: " + err.message);
      }
    );
  }, []);

  const handleEmergency = () => {
    if (position) {
      fetch('http://localhost:3000/api/emergency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude: position[0], longitude: position[1] }),
      })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to send location');
        alert('Emergency services notified with your location.');
      })
      .catch((err) => setError(err.message));
    } else {
      setError("Unable to get your location.");
    }
  };

  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]} // Initial dummy center
        zoom={13}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker /> {/* Custom marker to focus on location */}
      </MapContainer>

      
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Map;
