import { createContext, useState } from "react";

// create context
const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  // the value that will be given to the context
  const [userId, setUserId] = useState('');

  return (
    // the Provider gives access to the context to its children
    <GlobalContext.Provider value={{ userId, setUserId }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };