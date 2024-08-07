import CONTEXT_ACTIONS from './actions';
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case CONTEXT_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CONTEXT_ACTIONS.SET_CURRENT_CHAT_ID:
      return {
        ...state,
        currentChatId: action.payload,
      };
    case CONTEXT_ACTIONS.SET_CHAT_HISTORY:
      return {
        ...state,
        chatHistory: action.payload,
      };
    case CONTEXT_ACTIONS.SET_CHAT_DATA:
      return {
        ...state,
        chatData: action.payload,
      };
    case CONTEXT_ACTIONS.UPDATE_CHAT_HISTORY:
      return {
        ...state,
        chatHistory: [action.payload, ...state.chatHistory],
      };
    case CONTEXT_ACTIONS.EDIT_CHAT_HISTORY_FAVOURITE:
      return {
        ...state,
        chatHistory: state.chatHistory.map((chat: any) => {
          if (chat.id === action.payload.id) {
            return {...chat, favourite: action.payload.favourite};
          }
          return chat;
        }),
      };
    case CONTEXT_ACTIONS.EDIT_CHAT_HISTORY_TITLE:
      return {
        ...state,
        chatHistory: state.chatHistory.map((chat: any) => {
          if (chat.id === action.payload.id) {
            return {...chat, title: action.payload.title};
          }
          return chat;
        }),
      };
    case CONTEXT_ACTIONS.SET_FONT_SIZE:
      return {
        ...state,
        chatFontSize: action.payload,
      };
    case CONTEXT_ACTIONS.SET_AUTO_READ:
      return {
        ...state,
        autoRead: action.payload,
      };
    case CONTEXT_ACTIONS.DELETE_CHAT_HISTORY:
      return {
        ...state,
        chatHistory: state.chatHistory.filter((chat: any) => {
          if (chat.id !== action.payload.id) {
            return chat;
          }
        }),
      };
    default:
      return state;
  }
};

export default reducer;
