import owl from '../../images/icon.png'
import { fetchUser, editUser, selectUser, selectError, selectStatus } from "../redux/SignInPgSlice"
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react';
import { usersSelector, addUser } from '../redux/allUsersSlice';
import { getUsers, storeUsers } from '../firebase/manageDbUsers';
import EditProfileInfo from '../ManageUser/EditProfileInfo';
import Footer from '../Footer';
import addUserInfoToUser from '../ManageUser/addUserInfoToUser';
import useAuth from './useAuth';

function checkIsUserInDatabase(user, users) {
        // Returns array with nested object
        const thisUser = users.filter((obj) => obj.email === user.email);
        if(thisUser.length === 0) return false;
        return thisUser[0];
}

export default function SignInPg() {

    const dispatch = useDispatch();
    const nav = useNavigate();

    // Get state from redux store
    const user = useSelector(selectUser);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const users = useSelector(usersSelector);

    // Keep track of whether logged in user has account, and is signed in
    const [hasAccount, setHasAccount] = useState(false);
    const { isSignedIn, signedInUser } = useAuth();

    // Once google sign in is complete, check whether to add user to database
    useEffect(() => {
        if(status !== 'succeed') return;
        // IfAddToDatabase adds unknown user to Redux, returns boolean depending on whether user exists or not.
        setHasAccount(ifAddToDatabase(user, users));
    }, [status])

    // Once user successfully signs in (no loading & hasAccount is true), nav to dashboard and add user to Users 
    useEffect(() => {
        if('personalInfo' in user === false || !isSignedIn) return;
        
        if(isSignedIn && user.personalInfo.hasAccount === true && status !== 'loading') {
            nav('/dashboard');
            // Only store user in database after it has been changed.
            storeUsers(user);
        }
    }, [user, isSignedIn])

    useEffect(() => {
        // Retrieve users from database
        getUsersFromDatabase();
    }, [])

    const getUsersFromDatabase = async() => await getUsers().then((res) => {
        if(res[0] === undefined) return;
        dispatch(addUser(res))
    }).catch(error => console.log(error));

    // If user is in database, return true, else add new user and return false
    const ifAddToDatabase = (user, users) => {
        // If exists, will return object, otherwise will return false.
        const existingUser = checkIsUserInDatabase(user, users);

        console.log(existingUser);

        if(existingUser === false) return true;

        // If user already exists, combine user and personalInfo section of existingUser and return false.
        dispatch(editUser({
            ...user, 
            personalInfo: {
                ...existingUser.personalInfo,
            }}))
            
        // If has account, it will return true and navigate to dashboard, otherwise false and account will be created.
        return user.personalInfo.hasAccount;
    }

    const saveNewUserToDatabase = (e, user, userInfo) => {
        // Store in database & add to users array
        const newUser = addUserInfoToUser(e, user, userInfo);
        // Store in database & add to users array
        dispatch(addUser(newUser));
        // Add to current user array
        dispatch(editUser(newUser));
    }

    return (
        <div id='sign-in-container'>
            { hasAccount && (<EditProfileInfo user={user} saveToDatabase={saveNewUserToDatabase} />) }
            <div id='sign-in-box'>
                <div id='sign-in-logo'
                style={{
                    backgroundImage: `url(${owl})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat'
                }}></div>
                <div id='heading-btn'>
                    <p className='sign-in-heading'>Welcome to Hooter</p>
                    <button id='sign-in'
                    onClick={() => dispatch(fetchUser())}>Sign In With Google</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}