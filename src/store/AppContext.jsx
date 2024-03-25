import { createContext, useState } from "react";

export const AppContext = createContext({
  isProfileVisible: false,
  showProfilePortal: () => {},
  hideProfilePortal: () => {},
});

const AppContextProvider = ({ children }) => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const showProfilePortal = () => setIsProfileVisible(true);
  const hideProfilePortal = () => setIsProfileVisible(false);

  const value = {
    isProfileVisible,
    showProfilePortal,
    hideProfilePortal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
