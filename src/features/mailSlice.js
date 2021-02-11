import { createSlice } from "@reduxjs/toolkit";

export const mailSlice = createSlice({
  name: "mail",
  initialState: {
    selectedMail: null,
    sendMessageIsOpen: false,
    nbMessage: 0,
  },
  reducers: {
    setMail: (state, action) => {
      state.selectedMail = action.payload;
    },
    openSendMessage: (state) => {
      state.sendMessageIsOpen = true;
    },
    closeSendMessage: (state) => {
      state.sendMessageIsOpen = false;
    },
    setNbMessages: (state, action) => {
      state.nbMessage = action.payload;
    },
    delNbMessage: (state) => {
      state.nbMessage -= 1;
    },
  },
});

export const {
  openSendMessage,
  closeSendMessage,
  setMail,
  setNbMessages,
  delNbMessage,
} = mailSlice.actions;

export const selectMail = (state) => state.mail.sendMessageIsOpen;
export const selectOpenMail = (state) => state.mail.selectedMail;
export const selectNbMessages = (state) => state.mail.nbMessage;

export default mailSlice.reducer;
