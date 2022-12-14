import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from "../firebaseConfig";
import addUserInfo  from './addUserInfo';

const initialState  = {
    status: '',
    user: [],
    error: null
}

const edit = createAction('editUser');

function editUser(obj) {
    return {
        type: 'editUser',
        payload: obj
    }
}

const provider = new GoogleAuthProvider();

const fetchUser = createAsyncThunk(
    'account/fetchUser', 
    async() => {
        let userInfo; 
        const auth = getAuth(app);
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
            builder.addCase(edit, (state, action) => {
                state.user = {...action.payload};
            })
    }
})

export const selectUser = (state) => state.user.user;     
export const selectStatus = (state) => state.user.status;
export const selectError = (state) => state.user.error;

export { fetchUser, editUser }
export default accountSlice.reducer;