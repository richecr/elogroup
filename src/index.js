import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { UserProvider } from "./providers/User/UserProvider";
import { LeadProvider } from "./providers/Lead/LeadProvider";

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <LeadProvider>
                <App />
            </LeadProvider>
        </UserProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
