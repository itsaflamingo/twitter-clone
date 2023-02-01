import { combineReducers, configureStore } from '@reduxjs/toolkit'
import accountReducer from '../components/redux/SignInPgSlice';
import tweetsReducer from '../components/redux/createTweetSlice'
import usersReducer from '../components/redux/allUsersSlice'
import userTweetsReducer from '../components/redux/userTweetsSlice';
import storeTweetIdReducer from '../components/redux/storeTweetIdSlice';
  
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