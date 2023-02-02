import { createAction, createReducer } from "@reduxjs/toolkit";

// Actions
const STORE_TWEET_ID = createAction('STORE_TWEET_ID');

// Reducer
const storeTweetIdReducer = createReducer([], builder => {
    builder 
        .addCase(STORE_TWEET_ID, (state, action) => {
            return state.concat(action.payload);
        })
})

// Action Creators
function storeTweetId(id) {
    return {
        type: 'STORE_TWEET_ID',
        payload: id
    }
}

export const tweetIdsSelector = (state) => state.tweetIds;
export { storeTweetId };
export default storeTweetIdReducer;