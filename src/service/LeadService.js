class LeadService {
    constructor() {
        this.LEAD_STORAGE = "leads";
    }

    getAll() {
        let leads = {};
        if (localStorage.hasOwnProperty(this.LEAD_STORAGE)) {
            leads = JSON.parse(localStorage.getItem(this.LEAD_STORAGE));
        }

        return leads;
    }

    save(leads) {
        localStorage.setItem(this.LEAD_STORAGE, JSON.stringify(leads));
    }
}

export default LeadService;
