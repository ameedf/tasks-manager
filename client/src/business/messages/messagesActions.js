export const SET_MESSAGES = "messages/set";
export const DISMISS_MESSAGES = "messages/dismiss";

export const setMessages = messages => ({type: SET_MESSAGES, messages});

export const dismissMessages = () => ({type: DISMISS_MESSAGES});

