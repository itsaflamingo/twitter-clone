import { useState, useEffect } from "react";
import CreateTweetOptions from "./CreateTweetOptions";
import DisplayTweet from "./DisplayTweet";
import TweetInput from "./TweetInput";
import getDate from "./getDate";
import { useDispatch } from "react-redux";
import { addTweet } from "./CreateTweetSlice";
import uniqid from 'uniqid';
import CreateTweet from "./CreateTweet";

export default function RetweetPopUp(props) {

    const { tweet } = props;


    return (
        <div className='retweet-pop-up'>
            <CreateTweet />
            <DisplayTweet tweet={tweet} />
        </div>
    )
}