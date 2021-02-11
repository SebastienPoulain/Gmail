import { Checkbox, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./EmailList.css";
import RefreshIcon from "@material-ui/icons/Refresh";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Section from "./Section";
import KeyboardHideIcon from "@material-ui/icons/KeyboardHide";
import InboxIcon from "@material-ui/icons/Inbox";
import PeopleIcon from "@material-ui/icons/People";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import EmailRow from "./EmailRow";
import { db } from "./firebase";
import { selectUser } from "./features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { setNbMessages } from "./features/mailSlice";

function EmailList() {
  const [emails, setEmails] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
    if (user.email !== undefined) {
      db.collection("emails")
        .where("deleted", "==", false)
        .where("to", "==", user?.email)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setEmails(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
          dispatch(setNbMessages(snapshot.docs.length));
        });
    }

    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="emailList">
      <div className="emailList__settings">
        <div className="emailList__settingsLeft">
          <Checkbox />
          <IconButton title="Actualiser">
            <RefreshIcon />
          </IconButton>
          <IconButton title="Plus">
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="emailList__settingsRight">
          <IconButton title="Suivant">
            <ChevronLeftIcon />
          </IconButton>
          <IconButton title="Précédent">
            <ChevronRightIcon />
          </IconButton>
          <IconButton title="Activer/désactiver les outils de saisie (Ctrl+Maj+K)">
            <KeyboardHideIcon />
          </IconButton>
        </div>
      </div>
      <div className="emailList__sections">
        <Section title="Principale" Icon={InboxIcon} selected color="red" />
        <Section title="Réseaux sociaux" Icon={PeopleIcon} color="#1A73E8" />
        <Section title="Promotions" Icon={LocalOfferIcon} color="green" />
      </div>
      <div className="emailList__list">
        {emails.map(
          ({
            id,
            data: {
              to,
              subject,
              message,
              timestamp,
              read,
              favorite,
              important,
            },
          }) => (
            <EmailRow
              favorite={favorite}
              important={important}
              read={read}
              id={id}
              key={id}
              title={to}
              subject={subject}
              description={message}
              time={new Date(timestamp?.seconds * 1000).toUTCString()}
            />
          )
        )}
      </div>
    </div>
  );
}

export default EmailList;
