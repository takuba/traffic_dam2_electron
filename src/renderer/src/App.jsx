import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Cameras from './camera';
import Incidences from './incidence';
import FormItems from './FormItems';
import Meter from './Meter';

function App() {
  const [selectedComponent, setSelectedComponent] = useState("camera");
  
  useEffect(() => {
    window.electron.ipcRenderer.on('menu-click', (event, component) => {
      console.log(component);
      setSelectedComponent(component);
    })
    
    return () => {
    };
  }, []);

  return (
    <Router>
      <div className="container">
        <h2 className="hero-text">Admin panel EuskoTrafficApp</h2>
        <br></br>
        <div className="features">
          {/* Define tus rutas dentro de un componente Routes */}
          <Routes>
            {selectedComponent === 'camera' && <Route path="/" element={<Cameras setType={setSelectedComponent}  />} />}
            {selectedComponent === 'incidence' && <Route path="/" element={<Incidences />} />}
            {selectedComponent === 'sensor' && <Route path="/" element={<Meter />} />}
            {selectedComponent === 'form' && <Route path="/" element={<FormItems />} />}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
