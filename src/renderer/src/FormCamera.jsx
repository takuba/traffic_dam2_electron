import React, { useEffect, useState } from 'react';
function FormCamera() {

  const [cameraData, setCameraData] = useState({
    cameraId: '',
    cameraName: '',
    urlImage: '',
    latitude: '',
    longitude: '',
    sourceId: '',
    sourceName: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    setCameraData({ ...cameraData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setCameraData({ ...cameraData, urlImage: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      if(cameraData.cameraId==""||cameraData.cameraName==""||cameraData.latitude==""||cameraData.longitude==""||cameraData.sourceId==""){
        setSuccessMessage('Porfavor complete los campos');

      }else {
        console.log(cameraData.urlImage);
        const response = await fetch('http://localhost:3000/cameras', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cameraData),
        });
    
        if (!response.ok) {
          throw new Error(`Error al realizar la solicitud POST: ${response.status}`);
        }
    
        const data = await response.json();
        setSuccessMessage('¡Datos guardados exitosamente!');
        console.log('Solicitud POST exitosa:', data);
        // Puedes realizar otras acciones después de guardar
      }

    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);
      setSuccessMessage('Error al guardar los datos. Por favor, inténtalo de nuevo.');
    }
  };
  function test(){
    window.electron.ipcRenderer.send('mensaje', 'hello')

      }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Formulario de Cámaras</h2>
      <br></br>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Camera ID:</span>
        <input type="text" name="cameraId" value={cameraData.cameraId} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Camera Name:</span>
        <input type="text" name="cameraName" value={cameraData.cameraName} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Image URL:</span>
        <input type="file" accept="image/*" onChange={handleImageChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Latitude:</span>
        <input type="text" name="latitude" value={cameraData.latitude} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Longitude:</span>
        <input type="text" name="longitude" value={cameraData.longitude} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Source ID:</span>
        <input type="text" name="sourceId" value={cameraData.sourceId} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <button style={{ padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }} onClick={handleSave}>Guardar</button>
      {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}

    </div>
  );
}

export default FormCamera;
