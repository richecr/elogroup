import { LogoutOutlined, RollbackOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { useUserStore } from "../../providers/User/UserProvider";
import Logo from "../../assets/logo.svg";
import "./style.css";

const Header = ({ titleHeader, setTitleHeader }) => {
  const UserStore = useUserStore();

  return (
    <div className="home">
      <img className="logo" alt="Logo da Elo Group" src={Logo} />
      <div className="title">
        <h2 style={{ color: "white", marginRight: 15 }}>{titleHeader}</h2>
        <Link
          className="button-logout"
          to={titleHeader === "Novo Lead" ? "/leads" : "/"}
          onClick={() => {
            if (titleHeader === "Painel de Leads") {
              UserStore.logout();
            }

            setTitleHeader("");
          }}
        >
          {titleHeader === "Novo Lead" ? (
            <RollbackOutlined style={{ fontSize: 25 }} />
          ) : UserStore.is_logged ? (
            <LogoutOutlined style={{ fontSize: 25 }} />
          ) : null}
        </Link>
      </div>
    </div>
  );
};

export default Header;
