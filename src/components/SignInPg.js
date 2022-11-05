import logo from '../images/twitter.webp'
import { fetchUser } from "./SignInPgSlice"
import { useNavigate } from 'react-router-dom';
import { selectUser, selectError, selectStatus } from "./SignInPgSlice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react';

export default function SignInPg() {

    const user = useSelector(selectUser);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const dispatch = useDispatch();

    const nav = useNavigate();

    useEffect(() => {
        if(status !== 'succeed') return;
        nav('/dashboard');
    }, [status])

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