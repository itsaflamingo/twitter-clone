import { createAction, createReducer, current } from "@reduxjs/toolkit";

const initialState = [];

const ADD_TWEET = createAction('ADD_TWEET');
const DELETE_TWEET = createAction('DELETE_TWEET');
const UPDATE_TWEET = createAction('UPDATE_TWEET');
const CHANGE_TWEETS = createAction('CHANGE_TWEETS');

const tweetsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ADD_TWEET, (state, action) => {
            return [...state, action.payload].reverse();
        })  
        .addCase(DELETE_TWEET, (state, action) => {
            return state.filter(tweet => tweet.id !== action.payload)
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
    
    function deleteTweet(id) {
        return {
            type: 'DELETE_TWEET',
            payload: id
        }
    }

export const tweetsSelector = (state) => state.tweets;
export { addTweet, updateTweet, changeTweets, deleteTweet };
export default tweetsReducer;
