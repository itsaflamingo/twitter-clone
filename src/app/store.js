import { combineReducers, configureStore } from '@reduxjs/toolkit'
import accountReducer from '../components/Sign_In_Page/SignInPgSlice';
import tweetsReducer from '../components/Dashboard/createTweetSlice'
import usersReducer from '../components/Dashboard/allUsersSlice'
import userTweetsReducer from '../components/Dashboard/userTweetsSlice';
import storeTweetIdReducer from '../components/Dashboard/storeTweetIdSlice';
  
  // STORE -> GLOBALIZED STATE
  const rootReducer = combineReducers({
      users: usersReducer,
      user: accountReducer,
      tweets: tweetsReducer,
      userTweets: userTweetsReducer,
      tweetIds: storeTweetIdReducer
  });

  const setupStore = preloadedState => {
    return configureStore({
      reducer: rootReducer,
      preloadedState
    })
  }
  
  export { setupStore };