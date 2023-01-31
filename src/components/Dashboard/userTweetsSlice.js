import { createAction, createReducer } from "@reduxjs/toolkit";

// Actions
const USER_ADD_TWEETS = createAction('USER_ADD_TWEETS');
const USER_DELETE_TWEET = createAction('USER_DELETE_TWEET');

// Reducer
const userTweetsReducer = createReducer([], builder => {
    builder
        .addCase(USER_ADD_TWEETS, (state, action) => {
            return state.concat(action.payload);
        })
        .addCase(USER_DELETE_TWEET, (state, action) => {
            return state.filter(tweet => tweet.id !== action.payload)
        })
})

// Action Creators
function userAddTweets(array) {
    return {
        type: 'USER_ADD_TWEETS',
        payload: array
    }
}

function userDeleteTweet(id) {
    return {
        type: 'USER_DELETE_TWEET',
        payload: id
    }
}

export const userTweetsSelector = (state) => state.userTweets;
export { userAddTweets, userDeleteTweet };
export default userTweetsReducer;