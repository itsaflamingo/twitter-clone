import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from "../firebaseConfig";
import addUserInfo  from './addUserInfo';

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

const provider = new GoogleAuthProvider();

const fetchUser = createAsyncThunk(
    'account/fetchUser', 
    async() => {
        let userInfo; 
            await signInWithPopup(auth, provider)
                  .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    userInfo = user;
                  })
                  .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                    console.log(error);
                    return error
                })
        
        return JSON.stringify(userInfo);
    })


export const selectUser = (state) => state.user.user;     
export const selectStatus = (state) => state.user.status;
export const selectError = (state) => state.user.error;

export { fetchUser, editUser, resetUser }
export default accountSlice.reducer;