import React, {createContext, useReducer} from 'react';
import reducer from './reducer';
import {storeType} from '../types/type';

const initialValues: storeType = {
  user: null,
  currentChatId: null,
  chatHistory: [],
  chatData: [],
  chatFontSize: 18,
  autoRead: false,
};

const StoreContext = createContext<{
  store: storeType;
  dispatch: Function;
}>({store: initialValues, dispatch: () => {}});

const Store = ({children}: {children: React.ReactNode}) => {
  const [store, dispatch] = useReducer(reducer, initialValues);
  return (
    <StoreContext.Provider value={{store, dispatch}}>
      {children}
    </StoreContext.Provider>
  );
};

export {StoreContext};
export default Store;
