import { createContext, useState } from "react";

// create context
const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  // the value that will be given to the context
  const [userID, setUserID] = useState('');

  return (
    // the Provider gives access to the context to its children
    <GlobalContext.Provider value={{ userID, setUserID }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };