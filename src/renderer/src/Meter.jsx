import React, { useState, useEffect } from 'react';
import defaultImage from './cam.jpg';
import { NavLink } from 'react-router-dom';
import FormItems from './FormItems';
const { ipcRenderer } = require('electron');

function Meter({setType}) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/flowMeter/${currentPage}`);
        const json = await response.json();
        console.log(json);
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const ItemTable = () => {
    return (
      data.features &&
      data.features.map((item, index) => {
        return (
          <div className="feature-item" key={index}>
            <article onClick={()=>ipcRenderer.send('open_map', location={latitude:item.properties.latitude,longitude:item.properties.longitude})}>

                <>
                  <h2 className="title">Meter ID : {item.properties.meterId}</h2>
                  <p className="detail">Descripción: {item.properties.description}</p>
                  <p className="detail">Fuente ID: {item.properties.sourceId}</p>
                </>
              
            </article>
          </div>
        );
      })
    );
  };
  

  return (
    <>
      {ItemTable()}
      <div className="pagination">
        <button onClick={handlePrevPage}>Anterior</button>
        <span>Página {currentPage}</span>
        <button onClick={handleNextPage}>Siguiente</button>
      </div>
    </>
  );
}

export default Meter;
