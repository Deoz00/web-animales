import React from 'react';
import '../css/estilos.css';

const Concepto = ({ titulo }) => {
    return <div className="concepto">{titulo}</div>;
  };
  
  const Relacion = ({ concepto1, concepto2 }) => {
    return (
      <div className="relacion">
        <div className="concepto">{concepto1}</div>
        <div className="conector">---</div>
        <div className="concepto">{concepto2}</div>
      </div>
    );
  };
  
  export { Concepto, Relacion };
