import React from "react";
import { useLocalStore } from "mobx-react";

import { user } from "../../stores/UserStore";

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const userStore = useLocalStore(() => user);

  return (
    <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
  );
};

export const useUserStore = () => React.useContext(UserContext);
