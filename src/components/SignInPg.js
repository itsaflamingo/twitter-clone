import logo from '../images/twitter.webp'
import { fetchUser } from "./SignInPgSlice"
import { useNavigate } from 'react-router-dom';
import { selectUser, selectError, selectStatus } from "./SignInPgSlice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react';
import { usersSelector, addUser } from './allUsersSlice';
import { storeUsers } from './storeInCloud';
import { getUsers } from './retrieveFromCloud';

export default function SignInPg() {

    const user = useSelector(selectUser);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const users = useSelector(usersSelector)
    const dispatch = useDispatch();

    const nav = useNavigate();

    useEffect(() => {
        if(status !== 'succeed') return;
        nav('/dashboard');
        getdbUsers();
        isInDatabase(user);
    }, [status])

    useEffect(() => {
        // Retrieve users from database
        getdbUsers();
    }, [])

    const getdbUsers = async() => {
        let dbUsers;
        await getUsers().then((res) => dbUsers = res);
        dispatch(addUser(dbUsers))
    }

    const isInDatabase = (user) => {

        const thisUser = users.filter((obj) => obj.user.displayName === user.displayName);

        if(thisUser.length === 0) {
            //Store in database & add to users array
            dispatch(addUser(user));
            storeUsers(user);
        }
        
        // if user already exists exit
        return;
    }

    return (
        <div id='sign-in-container'>
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