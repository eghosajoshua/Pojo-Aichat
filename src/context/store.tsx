import React, {createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducer from './reducer';
import {storeType, chatHistoryType} from '../types/type';

const initialValues: storeType = {
  user: {
    id: 'portfolio-demo-user',
    email: 'demo@aichat.local',
    user_metadata: {name: 'Demo User', avatar_url: null},
  },
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

  useEffect(() => {
    AsyncStorage.getItem('demoStore').then(value => {
      if (!value) return;
      const saved = JSON.parse(value);
      dispatch({type: 'HYDRATE_STORE', payload: saved});
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('demoStore', JSON.stringify(store));
  }, [store]);

  return (
    <StoreContext.Provider value={{store, dispatch}}>
      {children}
    </StoreContext.Provider>
  );
};

export {StoreContext};
export default Store;
