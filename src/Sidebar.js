import { Button, IconButton } from "@material-ui/core";
import React from "react";
import "./Sidebar.css";
import AddIcon from "@material-ui/icons/Add";
import InboxIcon from "@material-ui/icons/Inbox";
import SidebarOption from "./SidebarOption";
import StarIcon from "@material-ui/icons/Star";
import AccessTimeTwoToneIcon from "@material-ui/icons/AccessTimeTwoTone";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import SendIcon from "@material-ui/icons/Send";
import NoteIcon from "@material-ui/icons/Note";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LabelIcon from "@material-ui/icons/Label";
import PhoneIcon from "@material-ui/icons/Phone";
import PersonIcon from "@material-ui/icons/Person";
import DuoIcon from "@material-ui/icons/Duo";
import { useDispatch, useSelector } from "react-redux";
import { openSendMessage, selectNbMessages } from "./features/mailSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const nbMessages = useSelector(selectNbMessages);

  return (
    <div className="sidebar">
      <Button
        startIcon={<AddIcon fontSize="large" />}
        className="sidebar__compose"
        onClick={() => dispatch(openSendMessage())}
      >
        Nouveau Message
      </Button>
      <SidebarOption
        Icon={InboxIcon}
        title="Boîte de réception"
        number={nbMessages}
        selected={true}
      />
      <SidebarOption Icon={StarIcon} title="Favoris" />
      <SidebarOption Icon={AccessTimeTwoToneIcon} title="Reportés" />
      <SidebarOption Icon={LabelImportantIcon} title="Importants" />
      <SidebarOption Icon={SendIcon} title="Messages envoyés" />
      <SidebarOption Icon={NoteIcon} title="Brouillons" />
      <SidebarOption Icon={LabelIcon} title="Catégories" />
      <SidebarOption Icon={ExpandMoreIcon} title="Plus" />

      <div className="sidebar__footer">
        <div className="sidebar__footerIcons">
          <IconButton>
            <PersonIcon />
          </IconButton>
          <IconButton>
            <DuoIcon />
          </IconButton>
          <IconButton>
            <PhoneIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
