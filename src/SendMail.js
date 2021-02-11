import React from "react";
import "./SendMail.css";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeSendMessage } from "./features/mailSlice";
import { selectUser } from "./features/userSlice";
import { db } from "./firebase";
import firebase from "firebase";

function SendMail() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const onSubmit = (formData) => {
    console.log(formData);
    db.collection("emails").add({
      from: user.email,
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      favorite: false,
      important: false,
      read: false,
      deleted: false,
    });
    dispatch(closeSendMessage());
  };

  return (
    <div className="sendMail">
      <div className="sendMail__header">
        <h3>Nouveau Message</h3>
        <CloseIcon
          onClick={() => dispatch(closeSendMessage())}
          className="sendMail__close"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          name="to"
          placeholder="À"
          ref={register({ required: true })}
        />
        {errors.to && (
          <p className="sendMail__error">
            Vous devez entrer l'adresse d'un destinataire
          </p>
        )}
        <input
          name="subject"
          placeholder="Sujet"
          type="text"
          ref={register({ required: true })}
        />
        {errors.subject && (
          <p className="sendMail__error">Vous devez entrer un sujet</p>
        )}
        <input
          name="message"
          className="sendMail__message"
          placeholder="Message"
          type="text"
          ref={register({ required: true })}
        />
        {errors.message && (
          <p className="sendMail__error">Vous devez entrer un message</p>
        )}
        <div className="sendMail__options">
          <Button type="submit" className="sendMail__send">
            Envoyer
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMail;
