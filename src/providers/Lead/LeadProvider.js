import React from "react";
import { useLocalStore } from "mobx-react";

import { lead } from "../../stores/LeadStore";

const LeadContext = React.createContext(null);

export const LeadProvider = ({ children }) => {
    const leadStore = useLocalStore(() => lead);

    return (
        <LeadContext.Provider value={leadStore}>
            {children}
        </LeadContext.Provider>
    );
};

export const useLeadStore = () => React.useContext(LeadContext);
