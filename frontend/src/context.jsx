import { createContext, useState } from "react";

// create context
const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  // the value that will be given to the context
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState({});
  //To be used in the future
  //const [userName, setUserName] = useState('');
  return (
    // the Provider gives access to the context to its children
    <GlobalContext.Provider value={{ userId, setUserId, userData, setUserData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };