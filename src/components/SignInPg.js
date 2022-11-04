import logo from '../images/twitter.webp'
import { selectAccountInfo, selectError, selectStatus, fetchUser } from "./SignInPgSlice"
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"

export default function SignInPg(props) {

    const account = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const info = useSelector(selectAccountInfo);

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