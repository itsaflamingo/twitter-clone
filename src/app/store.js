import { configureStore } from '@reduxjs/toolkit'
import accountReducer from '../components/SignInPgSlice';
import tweetsReducer from '../components/CreateTweetSlice'
import usersReducer from '../components/allUsersSlice'
  
  // STORE -> GLOBALIZED STATE
  let store = configureStore({
    reducer: {
      users: usersReducer,
      user: accountReducer,
      tweets: tweetsReducer
    }
  });
  
  export { store };