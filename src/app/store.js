import { combineReducers, configureStore } from '@reduxjs/toolkit'
import accountReducer from '../redux/SignInPgSlice';
import tweetsReducer from '../redux/createTweetSlice'
import usersReducer from '../redux/allUsersSlice'
import userTweetsReducer from '../redux/userTweetsSlice';
import storeTweetIdReducer from '../redux/storeTweetIdSlice';
  
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