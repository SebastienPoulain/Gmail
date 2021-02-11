import React from "react";
import "./Header.css";
import MenuIcon from "@material-ui/icons/Menu";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import HelpOutlineTwoToneIcon from "@material-ui/icons/HelpOutlineTwoTone";
import AppsIcon from "@material-ui/icons/Apps";
import { logout, selectUser } from "./features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./firebase";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout);
    });
  };

  return (
    <div className="header">
      <div className="header__left">
        <IconButton title="Menu principal">
          <MenuIcon />
        </IconButton>
        <img
          style={{ cursor: "pointer" }}
          title="Gmail"
          src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png"
          alt="Logo Gmail"
        />
      </div>
      <div className="header__middle">
        <IconButton title="Rechercher">
          <SearchIcon />
        </IconButton>
        <input placeholder="Rechercher dans les courriels" type="text" />
        <IconButton title="Afficher les options de recherche">
          <ArrowDropDownIcon className="header__inputCaret" />
        </IconButton>
      </div>
      <div className="header__right">
        <IconButton title="Assistance">
          <HelpOutlineTwoToneIcon />
        </IconButton>
        <IconButton title="Paramètres">
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton title="Applications Google">
          <AppsIcon />
        </IconButton>

        <IconButton onClick={signOut} title="Compte Google">
          <Avatar className="header__avatar" src={user?.photoUrl} />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
