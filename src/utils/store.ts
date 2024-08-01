import {createContext, useReducer} from 'react';

const StoreContext = createContext<{store: any; dispatch: any} | null>(null);

const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_CURRENT_CHAT_ID: 'SET_CURRENT_CHAT_ID',
  SET_CHAT_HISTORY: 'SET_CHAT_HISTORY',
  SET_CHAT_DATA: 'SET_CHAT_DATA',
  UPDATE_CHAT_HISTORY: 'UPDATE_CHAT_HISTORY',
  EDIT_CHAT_HISTORY_FAVOURITE: 'EDIT_CHAT_HISTORY_FAVOURITE',
  EDIT_CHAT_HISTORY_TITLE: 'EDIT_CHAT_HISTORY_TITLE',
  SET_FONT_SIZE: 'SET_FONT_SIZE',
  SET_AUTO_READ: 'SET_AUTO_READ',
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ACTIONS.SET_CURRENT_CHAT_ID:
      return {
        ...state,
        currentChatId: action.payload,
      };
    case ACTIONS.SET_CHAT_HISTORY:
      return {
        ...state,
        chatHistory: action.payload,
      };
    case ACTIONS.SET_CHAT_DATA:
      return {
        ...state,
        chatData: action.payload,
      };
    case ACTIONS.UPDATE_CHAT_HISTORY:
      return {
        ...state,
        chatHistory: [action.payload, ...state.chatHistory],
      };
    case ACTIONS.EDIT_CHAT_HISTORY_FAVOURITE:
      return {
        ...state,
        chatHistory: state.chatHistory.map((chat: any) => {
          if (chat.id === action.payload.id) {
            return {...chat, favourite: action.payload.favourite};
          }
          return chat;
        }),
      };
    case ACTIONS.EDIT_CHAT_HISTORY_TITLE:
      return {
        ...state,
        chatHistory: state.chatHistory.map((chat: any) => {
          if (chat.id === action.payload.id) {
            return {...chat, title: action.payload.title};
          }
          return chat;
        }),
      };
    case ACTIONS.SET_FONT_SIZE:
      return {
        ...state,
        chatFontSize: action.payload,
      };
    case ACTIONS.SET_AUTO_READ:
      return {
        ...state,
        autoRead: action.payload,
      };
    default:
      return state;
  }
};

export {StoreContext, reducer, ACTIONS};
