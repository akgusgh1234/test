// Money.js
import React, { createContext, useState } from 'react';

export const MoneyContext = createContext({
    balances: {},
    updateBalance: () => {},
});

export const MoneyProvider = ({ children }) => {
  const [balances, setBalances] = useState({});

  const updateBalance = (id, amount) => {
    setBalances(prev => ({
      ...prev,          
      [id]: amount      
    }));
  };

  return (

    <MoneyContext.Provider value={{ balances: balances || {}, updateBalance }}>
      {children}
    </MoneyContext.Provider>
  );
};