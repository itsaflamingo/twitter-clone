import { configureStore } from '@reduxjs/toolkit'
import accountReducer from '../components/Sign_In_Page/SignInPgSlice';
import tweetsReducer from '../components/Dashboard/CreateTweetSlice'
import usersReducer from '../components/Dashboard/allUsersSlice'
import userTweetsReducer from '../components/Dashboard/userTweetsSlice';
import storeTweetIdReducer from '../components/Dashboard/storeTweetIdSlice';
  
  // STORE -> GLOBALIZED STATE
  let store = configureStore({
    reducer: {
      users: usersReducer,
      user: accountReducer,
      tweets: tweetsReducer,
      userTweets: userTweetsReducer,
      tweetIds: storeTweetIdReducer
    }
  });
  
  export { store };