import { createAction, createReducer } from "@reduxjs/toolkit";

// Actions
const ADD_TO_ALL_USERS = createAction('ADD_TO_ALL_USERS'); 
const REMOVE_FROM_ALL_USERS = createAction('REMOVE_TO_ALL_USERS');
const EDIT_ALL_USERS = createAction('EDIT_ALL_USERS');

// Reducer
const usersReducer = createReducer([], (builder) => {
    builder
        .addCase(ADD_TO_ALL_USERS, (state, action) => {
            return state.concat(action.payload);
        })  
        .addCase(EDIT_ALL_USERS, (state, action) => {
            state.map((user, index) => {
                if(index === action.payload.index) {
                    return {
                        ...user, 
                        ...action.payload.updatedValues
                    }
                }
                return user;
            })
        })
        .addCase(REMOVE_FROM_ALL_USERS, (state, action) => {
            deleteUser(state, action.payload);
        })
    })

// Action creators
function addUser(obj) {
    return {
        type: 'ADD_TO_ALL_USERS',
        payload: obj
    }
}

function editUsers(index, updatedValues) {
    return {
        type: 'EDIT_ALL_USERS',
        payload: {
            index,
            updatedValues
        }
    }
}

function deleteUser(state, obj) {
    const tweet = state.filter(() => state.id === obj.id);
            const index = state.indexOf(tweet);
            state.splice(index, 1);
}

export const usersSelector = (state) => state.users;
export { addUser, editUsers, deleteUser };
export default usersReducer;
