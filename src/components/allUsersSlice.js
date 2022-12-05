import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = [];
const add = createAction('addUser'); 
const remove = createAction('deleteUser');

function addUser(obj) {
    return {
        type: 'addUser',
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
        .addCase(add, (state, action) => {
            return state.concat(action.payload)
        })  
        .addCase(remove, (state, action) => {
            deleteUser(state, action.payload);
        })
    })

export const usersSelector = (state) => state.users;
export { addUser, deleteUser };
export default usersReducer;
