import { IconButton } from "@material-ui/core";
import React, { useEffect } from "react";
import "./Mail.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
import ErrorIcon from "@material-ui/icons/Error";
import DeleteIcon from "@material-ui/icons/Delete";
import EmailIcon from "@material-ui/icons/Email";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router-dom";
import LabelIcon from "@material-ui/icons/Label";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PrintIcon from "@material-ui/icons/Print";
import { useSelector, useDispatch } from "react-redux";
import { selectOpenMail, delNbMessage } from "./features/mailSlice";
import Moment from "react-moment";
import "moment/locale/fr";
import { db } from "./firebase";

function Mail() {
  const history = useHistory();
  const selectedMail = useSelector(selectOpenMail);
  const dispatch = useDispatch();

  const deleteMessage = () => {
    db.collection("emails").doc(selectedMail.id).update({
      deleted: true,
    });
    dispatch(delNbMessage());
    history.replace("/");
  };

  const unread = () => {
    db.collection("emails").doc(selectedMail.id).update({
      read: false,
    });
    history.replace("/");
  };

  useEffect(() => {
    if (selectedMail === null) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="mail">
      <div className="mail__tools">
        <div className="mail__toolsLeft">
          <IconButton
            title="Retour au dossier « Boîte de réception »"
            onClick={() => history.push("/")}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton title="Archiver">
            <MoveToInboxIcon />
          </IconButton>
          <IconButton title="Signaler comme pourriel">
            <ErrorIcon />
          </IconButton>
          <IconButton onClick={deleteMessage} title="Supprimer">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={unread} title="Marquer comme non lue">
            <EmailIcon />
          </IconButton>
          <IconButton title="Reporter">
            <WatchLaterIcon />
          </IconButton>
          <IconButton title="Ajouter aux tâches">
            <CheckCircleIcon />
          </IconButton>
          <IconButton title="Déplacer vers">
            <LabelImportantIcon />
          </IconButton>
          <IconButton title="Étiquettes">
            <LabelIcon />
          </IconButton>
          <IconButton title="Plus">
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="mail__toolsRight">
          <IconButton onClick={() => window.print()} title="Tout imprimer">
            <PrintIcon />
          </IconButton>
          <IconButton title="Dans une nouvelle fenêtre">
            <ExitToAppIcon />
          </IconButton>
        </div>
      </div>
      <div className="mail__body">
        <div className="mail__top">
          <h1>{selectedMail?.subject}</h1>
        </div>
        <div className="mail__bodyHeader">
          <p>
            <b>{selectedMail?.title}</b>
          </p>
          <p className="mail__time">
            {<Moment format="D MMM k [h] mm">{selectedMail?.time}</Moment>}
          </p>
        </div>
        <div className="mail__message">
          <p>{selectedMail?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Mail;
