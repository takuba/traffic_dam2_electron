import React, { useState, useEffect } from 'react';
import defaultImage from './cam.jpg';
import { NavLink } from 'react-router-dom';
import FormItems from './FormItems';
const { ipcRenderer } = require('electron');

function Cameras({setType}) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cameras/${currentPage}`);
        const json = await response.json();
        //console.log(json.cameras);
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
      data.cameras &&
      data.cameras.map((item, index) => {
        return (
          <div className="feature-item" key={index}>
            <article onClick={()=>ipcRenderer.send('open_map', location={latitude:item.latitude,longitude:item.longitude})}>
                  <h2 className="title">Camera ID: {item.cameraId}</h2>
                  <p className="detail">Camera Name: {item.cameraName}</p>
                  <p className="detail">Fuente: {item.sourceName}</p>
                  <img
                    className='features .feature-item img'
                    src={item.urlImage || defaultImage}
                    alt={item.urlImage ? 'imagen' : 'no image'}
                  />
              
              
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

export default Cameras;
