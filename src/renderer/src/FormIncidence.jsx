import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function FormIncidence() {

  const [incidenceData, setincidenceData] = useState({
    incidenceId: '',
    sourceId: '',
    incidenceType: '',
    autonomousRegion: '',
    province: '',
    cause: '',
    startDate: '',
    latitude: '',
    longitude: '',
    incidenceLevel: '',
    direction: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    setincidenceData({ ...incidenceData, [name]: value });
    
  };



  const handleSave = async () => {
    console.log(incidenceData);
    try {
      if(incidenceData.incidenceId==""||incidenceData.incidenceType==""||incidenceData.autonomousRegion==""||incidenceData.province==""||incidenceData.cause==""||incidenceData.incidenceLevel==""||incidenceData.latitude==""){
        setSuccessMessage('Porfavor complete los campos');

      }else {
      const response = await fetch('http://localhost:3000/incidences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incidenceData),
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
      <h2 style={{ textAlign: 'center' }}>Formulario de Incidencias</h2>
      <br></br>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Incidencia ID: </span>
        <input type="text" name="incidenceId" value={incidenceData.incidenceId} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Incidencia Fuente: </span>
        <input type="text" name="sourceId" value={incidenceData.sourceId} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Tipo de incidencia: </span>
        <input type="text" name="incidenceType" value={incidenceData.incidenceType} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Comunuidad autonoma: </span>
        <input type="text" name="autonomousRegion" value={incidenceData.autonomousRegion} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Provincia: </span>
        <input type="text" name="province" value={incidenceData.province} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Causa: </span>
        <input type="text" name="cause" value={incidenceData.cause} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Fecha de comienzo: </span>
        <input type="datetime-local" name="startDate" value={incidenceData.startDate} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Latitud</span>
        <input type="text" name="latitude" value={incidenceData.latitude} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Longitud: </span>
        <input type="text" name="longitude" value={incidenceData.longitude} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Nivel de incidencia: </span>
        <input type="text" name="incidenceLevel" value={incidenceData.incidenceLevel} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <span style={{ marginRight: '8px', display: 'block' }}>Dirección: </span>
        <input type="text" name="direction" value={incidenceData.direction} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
      </label>
      <button style={{ padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }} onClick={handleSave}>Guardar</button>
      {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}

    </div>
  );
}

export default FormIncidence;
