import { createAction, createReducer } from "@reduxjs/toolkit";

// Actions
const USER_ADD_TWEETS = createAction('USER_ADD_TWEETS');

// Reducer
const userTweetsReducer = createReducer([], builder => {
    builder
        .addCase(USER_ADD_TWEETS, (state, action) => {
            return state.concat(action.payload);
        })
})

// Action Creators
function userAddTweets(array) {
    return {
        type: 'USER_ADD_TWEETS',
        payload: array
    }
}

export const userTweetsSelector = (state) => state.userTweets;
export { userAddTweets };
export default userTweetsReducer;