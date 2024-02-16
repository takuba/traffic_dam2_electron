import React, { useEffect, useState } from 'react';


function FormMeter() {

  const [meterData, setmeterData] = useState({
    meterId: '',
    description: '',
    sourceId: '',
    provinceId: '',
    municipalityId: '',
    latitude: '',
    longitude: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    setmeterData({ ...meterData, [name]: value });
    
  };



  const handleSave = async () => {
    console.log(meterData);
    try {
      if(meterData.meterId==""||meterData.sourceId==""||meterData.municipalityId==""||meterData.cause==""||meterData.incidenceLevel==""||meterData.latitude==""){
        setSuccessMessage('Porfavor complete los campos');

      }else {
      const response = await fetch('http://localhost:3000/flowMeter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meterData),
      });
  
      if (!response.ok) {
        throw new Error(`Error al realizar la solicitud POST: ${response.status}`);
      }
  
      const data = await response.json();
      setSuccessMessage('¡Datos guardados exitosamente!');
      console.log('Solicitud POST exitosa:', data);
    }
      // Puedes realizar otras acciones después de guardar
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);
      setSuccessMessage('Error al guardar los datos. Por favor, inténtalo de nuevo.');
    }
  };
//   function test(){
//     window.electron.ipcRenderer.send('mensaje', 'hello')

//       }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Formulario de Sensores</h2>
      <br></br>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Sensor ID: </span>
        <input type="text" name="meterId" value={meterData.meterId} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Sensor description: </span>
        <input type="text" name="description" value={meterData.description} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Fuente ID: </span>
        <input type="text" name="sourceId" value={meterData.sourceId} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Provincia: </span>
        <input type="text" name="provinceId" value={meterData.provinceId} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Municipalidad: </span>
        <input type="text" name="municipalityId" value={meterData.municipalityId} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Latitud</span>
        <input type="text" name="latitude" value={meterData.latitude} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Longitud: </span>
        <input type="text" name="longitude" value={meterData.longitude} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>

      <button style={{ padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }} onClick={handleSave}>Guardar</button>
      {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}

    </div>
  );
}

export default FormMeter;
