import logo from '../../images/twitter.webp'
import { fetchUser, editUser, selectUser, selectError, selectStatus } from "./SignInPgSlice"
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react';
import { usersSelector, addUser } from '../Dashboard/allUsersSlice';
import { storeUsers } from '../storeInCloud';
import { getUsers } from '../retrieveFromCloud';
import SignUp from './SignUp';
import hasProfanity from '../hasProfanity';
import Footer from '../Footer';

export default function SignInPg() {

    const [hasAccount, setHasAccount] = useState(false);

    const user = useSelector(selectUser);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const users = useSelector(usersSelector);
    const dispatch = useDispatch();

    const nav = useNavigate();

    useEffect(() => {
        if(status !== 'succeed') return;
        // isInDatabase adds unknown user to Redux, returns boolean depending on whether user exists or not.
        setHasAccount(isInDatabase(user));
    }, [status])

    useEffect(() => {
        if('personalInfo' in user === false) return;
        if(user.personalInfo.hasAccount === true) {
            nav('/dashboard');
            // Only store user in database after it has been changed.
            storeUsers(user);
        }
    }, [user])

    useEffect(() => {
        // Retrieve users from database
        getUsersFromDatabase();
    }, [])

    const getUsersFromDatabase = async() => {
        let dbUsers;
        await getUsers().then((res) => dbUsers = res);
        dispatch(addUser(dbUsers));
    }

    // If user is in database, return true, else add new user and return false
    const isInDatabase = (user) => {

        // Returns array with nested object
        const thisUser = users.filter((obj) => obj.email === user.email);

        if(thisUser.length === 0) return true;
        // if user already exists, combine user and personalInfo section of thisUser and return false.
        dispatch(editUser({
            ...user, 
            personalInfo: {
                ...thisUser[0].personalInfo,
            }}))
        // If has account, it will return true and navigate to dashboard, otherwise false and account will be created.
        return user.personalInfo.hasAccount;
    }

    const saveToDatabase = (e, user, userInfo) => {
        e.preventDefault();

        if (hasProfanity(userInfo.name) === true || 
            hasProfanity(userInfo.handle) === true ||
            hasProfanity(userInfo.description) === true) return;

        const { profilePicture, coverPhoto, ...rest} = userInfo;
            
        //Store in database & add to users array
        dispatch(addUser({
            ...user,
            personalInfo: {
                ...user.personalInfo,
                ...rest,
                profileInfo: {
                    ...user.personalInfo.profileInfo,
                    profilePicture,
                    coverPhoto,
                }
        }}))

        dispatch(editUser({
            ...user,
            personalInfo: {
                ...user.personalInfo,
                ...rest,
                profileInfo: {
                    ...user.personalInfo.profileInfo,
                    profilePicture,
                    coverPhoto,
                }
        }
        }))
    }

    return (
        <div id='sign-in-container'>
            {hasAccount && (<SignUp user={user} saveToDatabase={saveToDatabase} />)}
            <div id='sign-in-box'>
                <div id='sign-in-logo'
                style={{
                    backgroundImage: `url(${logo})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat'
                }}></div>
                <div id='heading-btn'>
                    <h1>Welcome to Twitter Clone!</h1>
                    <button id='sign-in'
                    onClick={() => dispatch(fetchUser())}>Sign In</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}