import React from "react";

import "./style.css";
import Logo from "../../assets/logo.jpg";

const Header = () => {
  return (
    <div className="home">
      <img className="logo" alt="Logo da Elo Group" src={Logo} />
    </div>
  );
};

export default Header;
