import {createContext, useReducer} from 'react';

const StoreContext = createContext<{store: any; dispatch: any} | null>(null);

const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_CURRENT_CHAT_ID: 'SET_CURRENT_CHAT_ID',
  SET_CHAT_HISTORY: 'SET_CHAT_HISTORY',
  SET_CHAT_DATA: 'SET_CHAT_DATA',
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
    default:
      return state;
  }
};

export {StoreContext, reducer, ACTIONS};
