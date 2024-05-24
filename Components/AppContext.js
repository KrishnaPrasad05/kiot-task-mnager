import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [variableValue, setVariableValue] = useState('sumptuous-six-amazonsaurus.glitch.me');

  return (
    <AppContext.Provider value={{ variableValue, setVariableValue }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
