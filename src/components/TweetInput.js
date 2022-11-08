import { getAdditionalUserInfo } from "firebase/auth";
import { useState } from "react";

export default function TweetInput(props) {
    const { type, setInput } = props;

    const setTweetInput = (e) => setInput(e.target.value);

    return (
        <form>
            <label htmlFor='tweet'>Create Tweet</label>
            <input 
            type={type}
            id='tweet' 
            onChange={(e) => setTweetInput(e)} />
        </form>
    )
}