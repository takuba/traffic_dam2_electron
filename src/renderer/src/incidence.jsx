import React, { useState, useEffect } from 'react';
import defaultImage from './cam.jpg';
import { NavLink } from 'react-router-dom';
import FormItems from './FormItems';
const { ipcRenderer } = require('electron');

function Incidences({setType}) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/incidences/${currentPage}`);
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
      data.incidences &&
      data.incidences.map((item, index) => {
        return (
          <div className="feature-item" key={index}>
            <article onClick={()=>ipcRenderer.send('open_map', location={latitude:item.latitude,longitude:item.longitude})}>
                  <h2 className="title">Incidence ID: {item.incidenceId} </h2>
                  <p className="detail">Causas: {item.cause}</p>
                  <p className="detail">Provincia: {item.province}</p>
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

export default Incidences;
