import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = [];

const add = createAction('addTweet');
const remove = createAction('deleteTweet');
const update = createAction('updateTweet');

function addTweet(obj) {
    return {
        type: 'addTweet',
        payload: obj
    }
}

function updateTweet(index, updatedValues) {
    return {
        type: 'updateTweet',
        payload: {
            index,
            updatedValues
        }
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
            return [...state, action.payload].reverse();
        })  
        .addCase(remove, (state, action) => {
            deleteTweet(state, action.payload);
        })
        .addCase(update, (state, action) => {
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
    })

export const tweetsSelector = (state) => state.tweets;
export { addTweet, updateTweet };
export default tweetsReducer;
