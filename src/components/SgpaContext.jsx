import { createContext, useState } from 'react';

export const SgpaContext = createContext();

export const SgpaProvider = ({ children }) => {
  const [sgpaList, setSgpaList] = useState([]);

  const addSgpa = (newSgpa) => {
    setSgpaList((prevSgpaList) => [...prevSgpaList, newSgpa]);
  };

  return (
    <SgpaContext.Provider value={{ sgpaList, addSgpa }}>
      {children}
    </SgpaContext.Provider>
  );
};
