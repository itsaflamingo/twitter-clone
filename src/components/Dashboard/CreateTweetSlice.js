import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = [];

const ADD_TWEET = createAction('ADD_TWEET');
const DELETE_TWEET = createAction('DELETE_TWEET');
const UPDATE_TWEET = createAction('UPDATE_TWEET');
const CHANGE_TWEETS = createAction('CHANGE_TWEETS');

function addTweet(obj) {
    return {
        type: 'ADD_TWEET',
        payload: obj
    }
}

function updateTweet(index, updatedValues) {
    return {
        type: 'UPDATE_TWEET',
        payload: {
            index,
            updatedValues
        }
    }
}

function changeTweets(newTweets) {
    return {
        type: 'CHANGE_TWEETS',
        payload: newTweets
    }
}

function deleteTweet(obj) {
    return {
        type: 'DELETE_TWEET',
        payload: obj
    }
}

const tweetsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ADD_TWEET, (state, action) => {
            return [...state, action.payload].reverse();
        })  
        .addCase(DELETE_TWEET, (state, action) => {
            const tweet = state.filter(() => state.id === action.payload.id);
            const index = state.indexOf(tweet);
            state.splice(index, 1);
        })
        .addCase(UPDATE_TWEET, (state, action) => {
            return state.map((tweet, index) => {
                if(index === action.payload.index) {
                    return {
                        ...tweet,
                        ...action.payload.updatedValues
                    }
                }
                return tweet;
            });
        })
        .addCase(CHANGE_TWEETS, (state, action) => {
            return state = action.payload;
        })
    })

export const tweetsSelector = (state) => state.tweets;
export { addTweet, updateTweet, changeTweets };
export default tweetsReducer;
