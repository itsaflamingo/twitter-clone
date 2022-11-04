import {configureStore, applyMiddleware} from '@reduxjs/toolkit'
import accountReducer from '../components/SignInPgSlice';
import thunk from 'redux-thunk'
  
  // STORE -> GLOBALIZED STATE
  let store = configureStore({
    reducer: {
      user: accountReducer,
    }
  });
  
  export {store};