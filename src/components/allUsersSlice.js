import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = [];
const add = createAction('addUser'); 
const remove = createAction('deleteUser');
const edit = createAction('editUsers');

function addUser(obj) {
    return {
        type: 'addUser',
        payload: obj
    }
}

function editUsers(obj) {
    return {
        type: 'editUsers',
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
            return state.concat(action.payload);
        })  
        .addCase(edit, (state, action) => {
            return state.concat({
                ...state,
                ...action.payload
            })
        })
        .addCase(remove, (state, action) => {
            deleteUser(state, action.payload);
        })
    })

export const usersSelector = (state) => state.users;
export { addUser, editUsers, deleteUser };
export default usersReducer;
