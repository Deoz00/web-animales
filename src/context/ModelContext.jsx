// MiContexto.js
import React, { createContext, useContext, useState } from 'react';

const ModelContext = createContext();

export const ModelContextProvider = ({ children }) => {
  const [model, setModel] = useState(null);
  const [idf, setIdf] = useState(null);

  return (
    <ModelContext.Provider value={{ model, setModel, idf, setIdf }}>
      {children}
    </ModelContext.Provider>
  );
};

export  const useModelContext = () => {
  return useContext(ModelContext);
};
