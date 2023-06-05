import { useState } from 'react';
import Input from '../forms/Input';
import search from '../../images/search.png';
import { filterTweets } from '../../functions/filterTweets';
import { useSelector } from 'react-redux';
import { tweetsSelector } from '../../redux/createTweetSlice';

export default function Search(props) {

    const { setTweets } = props;
    const allTweets = useSelector(tweetsSelector);

    const onChange = (e) => {
        e.preventDefault();
        const input = e.target.value;
        setTweets(filterTweets(input, allTweets));
    }

    return (
        <div className="search" tabIndex='1'>
            <Input type='search' onChange={onChange} placeholder='Search Hooter' />
            <button type='submit' className='search-btn'>
                <img className='search-icon' src={search} alt='search' />
            </button>
        </div>
    )
}