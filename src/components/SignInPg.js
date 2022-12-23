import logo from '../images/twitter.webp'
import { fetchUser, editUser } from "./SignInPgSlice"
import { useNavigate } from 'react-router-dom';
import { selectUser, selectError, selectStatus } from "./SignInPgSlice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react';
import { usersSelector, addUser, editUsers } from './allUsersSlice';
import { storeUsers } from './storeInCloud';
import { getUsers } from './retrieveFromCloud';
import SignUp from './SignUp';

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

        const thisUser = users.filter((obj) => obj.user.email === user.email);

        if(thisUser.length === 0) return true;
        // if user already exists exit
        return false;
    }

    const saveToDatabase = (e, user, profileInfo) => {
        e.preventDefault();
        //Store in database & add to users array
        dispatch(editUsers({
            ...user,
            personalInfo: {
            ...user.personalInfo,
            ...profileInfo
        }}));
        dispatch(editUser({
            ...user,
            personalInfo: {
                ...user.personalInfo,
                ...profileInfo
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
        </div>
    )
}