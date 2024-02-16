import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const { ipcRenderer } = require('electron');
 
function MapComponent() {
  const [data, setData] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    ipcRenderer.on('location', (event, args) => {
      if (args.latitude !== undefined && args.longitude !== undefined) {
        setData(args);
      }
    });

    return () => {
      ipcRenderer.removeAllListeners('location');
    };
  }, []);

  // Renderizar solo si ambos valores de latitud y longitud son válidos
  if (data.latitude === null || data.longitude === null) {
    return null; // O cualquier otro indicador de carga que desees mostrar
  }

  return (
    <MapContainer center={[data.latitude, data.longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[data.latitude, data.longitude]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;
