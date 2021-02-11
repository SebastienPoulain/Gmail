import { Checkbox, IconButton } from "@material-ui/core";
import React from "react";
import "./EmailRow.css";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import LabelImportantOutlinedIcon from "@material-ui/icons/LabelImportantOutlined";
import { useHistory } from "react-router-dom";
import { setMail } from "./features/mailSlice";
import { useDispatch } from "react-redux";
import Moment from "react-moment";
import "moment/locale/fr";
import { db } from "./firebase";

function EmailRow({
  id,
  title,
  subject,
  description,
  time,
  read,
  favorite,
  important,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const openMail = () => {
    dispatch(
      setMail({
        id,
        title,
        subject,
        description,
        time,
      })
    );
    db.collection("emails").doc(id).update({
      read: true,
    });
    history.push("/mail");
  };

  const setFavorite = () => {
    if (favorite) {
      db.collection("emails").doc(id).update({
        favorite: false,
      });
    } else {
      db.collection("emails").doc(id).update({
        favorite: true,
      });
    }
  };

  const setImportant = () => {
    if (important) {
      db.collection("emails").doc(id).update({
        important: false,
      });
    } else {
      db.collection("emails").doc(id).update({
        important: true,
      });
    }
  };

  return (
    <div
      style={
        read ? { backgroundColor: "#f5f7f7" } : { backgroundColor: "unset " }
      }
      className="emailRow"
    >
      <div className="emailRow__options">
        <Checkbox />
        <IconButton onClick={setFavorite} title="Favoris">
          <StarBorderOutlinedIcon
            style={favorite ? { color: "#f4b400" } : { color: "unset" }}
          />
        </IconButton>
        <IconButton onClick={setImportant} title="Important">
          <LabelImportantOutlinedIcon
            style={important ? { color: "#f4b400" } : { color: "unset" }}
          />
        </IconButton>
      </div>
      <h3 onClick={openMail} className="emailRow__title">
        {title}
      </h3>
      <div onClick={openMail} className="emailRow__message">
        <h4>
          {subject}{" "}
          <span className="emailRow__description"> - {description}</span>
        </h4>
      </div>
      <p onClick={openMail} className="emailRow__time">
        {<Moment format="D MMM k [h] mm">{time}</Moment>}
      </p>
    </div>
  );
}

export default EmailRow;
