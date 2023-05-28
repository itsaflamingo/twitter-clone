import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import addUserInfo  from '../Sign_In_Page/addUserInfo';
import signIn from "../Sign_In_Page/signInFn";

const initialState  = {
    status: '',
    user: [],
    error: null
}

const RESET_USER = createAction('RESET_USER');
const EDIT_USER = createAction('EDIT_USER');

const accountSlice = createSlice({
    name: 'account/fetchUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
            builder.addCase(fetchUser.pending,  (state) => {
                state.status = 'loading';
            })
            builder.addCase(fetchUser.fulfilled,  (state, action) => {
                state.status = 'succeed';
                state.user = JSON.parse(action.payload);
                state.user = addUserInfo(state.user);
            })
            builder.addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            builder.addCase(EDIT_USER, (state, action) => {
                state.user = {...action.payload};
                console.log('user is edited');
            })
            builder.addCase(RESET_USER, (state) => {
                state.user = [];
                state.status = '';
                state.error = null;             
            })
    }
})

function editUser(obj) {
    return {
        type: 'EDIT_USER',
        payload: obj
    }
}

function resetUser() {
    return {
        type: 'RESET_USER'
    }
}

const fetchUser = createAsyncThunk (
    'account/fetchUser', 
    async() => { 
        return JSON.stringify(await signIn());
    })


export const selectUser = (state) => state.user.user;     
export const selectStatus = (state) => state.user.status;
export const selectError = (state) => state.user.error;

export { fetchUser, editUser, resetUser }
export default accountSlice.reducer;