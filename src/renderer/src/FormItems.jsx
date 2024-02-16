import React, { useEffect, useState } from 'react';
import FormCamera from './FormCamera';
import FormIncidence from './FormIncidence';
import FormMeter from './FormMeter';

const {ipcRenderer} = require('electron')

function FormItems() {
  const [type, setType] = useState("");
    useEffect(()=>{
        ipcRenderer.on('mensaje-ventana', (event,args) => {
            // Aquí puedes realizar acciones cuando se hace clic en el submenú de cámaras
            console.log(args);
            console.log("llego");
            setType(args)
          });
    },[])
    let componentToRender;

    switch (type) {
      case "camera":
        componentToRender = <FormCamera />;
        break;
      case "incidence":
        componentToRender = <FormIncidence/>;

      break;
      case "meter":
        componentToRender = <FormMeter/>;

      break;    
      default:

        break;
    }
  return (
   componentToRender
  );
}

export default FormItems;