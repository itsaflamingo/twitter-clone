import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = [];

const add = createAction('addTweet');
const remove = createAction('deleteTweet');

function addTweet(obj) {
    return {
        type: 'addTweet',
        payload: obj
    }
}

function deleteTweet(state, obj) {
    const tweet = state.filter(() => state.id === obj.id);
            const index = state.indexOf(tweet);
            state.splice(index, 1);
}

const tweetsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(add, (state, action) => {
            state.concat(action.payload);
        })  
        .addCase(remove, (state, action) => {
            deleteTweet(state, action.payload);
        })
    })

export const tweetsSelector = (state) => state;
export {addTweet};
export default tweetsReducer;
