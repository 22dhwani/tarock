import { createContext, useState } from "react";

// create context
const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  // the value that will be given to the context
  const [userData, setUserData] = useState({
    guestId: '',
    id: '',
    type: '', // NEW, TMP, REAL
    name: '',
    email: '',
    gender: 0, // 0: Female, 1: Male
    avatarIndex: 0,
    dob: '',
    isAuthorized: false
  });
  return (
    // the Provider gives access to the context to its children
    <GlobalContext.Provider value={{ userData, setUserData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };