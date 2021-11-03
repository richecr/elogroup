import { action, makeObservable, observable } from "mobx";
import uuid from "uuid/v4";

import LeadService from "../service/LeadService";
import UserService from "../service/UserService";

class LeadStore {
    leads = {};
    leads_ = {};

    constructor() {
        makeObservable(this, {
            leads: observable,
            leads_: observable,
            find_leads: action,
            save_lead: action,
            setLeads: action,
        });
        this.service = new LeadService();
        this.userService = new UserService();
        this.USER_LOGGED_STORAGE = "user_logged";
        this.LEAD_DEFAULT = {
            [uuid()]: {
                name: "Cliente em Potencial",
                items: [],
            },
            [uuid()]: {
                name: "Dados Confirmados",
                items: [],
            },
            [uuid()]: {
                name: "Reunião Agendada",
                items: [],
            },
        };
    }

    find_leads = () => {
        let leads = this.service.getAll();
        const user = JSON.parse(localStorage.getItem(this.USER_LOGGED_STORAGE));

        if (leads[user.username]) {
            this.leads_ = leads[user.username];
        } else {
            this.setLeads(this.LEAD_DEFAULT);
        }
    };

    get_id_lead(leads, user, lead_save) {
        let id = "";
        Object.entries(leads[user.username]).forEach((lead) => {
            if (lead[1].name === lead_save.status) {
                id = lead[0];
            }
        });

        return id;
    }

    save_lead = (lead_save) => {
        let leads = this.service.getAll();

        const user = JSON.parse(localStorage.getItem("user_logged"));
        if (!leads[user.username]) {
            leads[user.username] = this.LEAD_DEFAULT;
        }

        let id = this.get_id_lead(leads, user, lead_save);
        leads[user.username][id].items.push(lead_save);
        this.setLeads(leads[user.username]);
    };

    setLeads = (leads) => {
        const user = JSON.parse(localStorage.getItem(this.USER_LOGGED_STORAGE));
        this.leads[user.username] = leads;
        this.leads_ = leads;
        this.service.save(this.leads);
    };
}

const lead = new LeadStore();
export { lead };
