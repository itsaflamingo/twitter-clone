import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = [];
const ADD_TO_ALL_USERS = createAction('ADD_TO_ALL_USERS'); 
const REMOVE_FROM_ALL_USERS = createAction('REMOVE_TO_ALL_USERS');
const EDIT_ALL_USERS = createAction('editUsers');

function addUser(obj) {
    return {
        type: 'ADD_TO_ALL_USERS',
        payload: obj
    }
}

function editUsers(obj) {
    return {
        type: 'EDIT_ALL_USERS',
        payload: obj
    }
}

function deleteUser(state, obj) {
    const tweet = state.filter(() => state.id === obj.id);
            const index = state.indexOf(tweet);
            state.splice(index, 1);
}

const usersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ADD_TO_ALL_USERS, (state, action) => {
            return state.concat(action.payload);
        })  
        .addCase(EDIT_ALL_USERS, (state, action) => {
            return state.concat({
                ...state,
                ...action.payload
            })
        })
        .addCase(REMOVE_FROM_ALL_USERS, (state, action) => {
            deleteUser(state, action.payload);
        })
    })

export const usersSelector = (state) => state.users;
export { addUser, editUsers, deleteUser };
export default usersReducer;
