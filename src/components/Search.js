import { useState } from 'react';
import Input from './Input'
import search from '../images/search.png'

export default function Search(props) {

    const { onSubmit } = props;

    const [searchInput, setSearchInput] = useState('');

    const onChange = (e) => {
        setSearchInput(e.target.value);
    }

    return (
        <div className="search">
            <Input type='search' onChange={onChange} />
            <button type='submit' className='search-btn' 
            onSubmit={(e) => onSubmit(e, searchInput)}>
                <img className='search-icon' src={search} alt='search' />
            </button>
        </div>
    )
}