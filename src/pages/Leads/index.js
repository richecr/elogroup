import "./style.css";
import { useEffect } from "react";
import { useUserStore } from "../../providers/User/UserProvider";
import { useHistory } from "react-router-dom";

const Leads = () => {
  const UserStore = useUserStore();
  let history = useHistory();

  useEffect(() => {
    if (UserStore.is_logged) {
      return;
    } else {
      history.push("/");
    }
  }, [UserStore, history]);

  return (
    <>
      {UserStore.is_logged && (
        <div>
          <h1>LEADS</h1>
        </div>
      )}
    </>
  );
};

export default Leads;
