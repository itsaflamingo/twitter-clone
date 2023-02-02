import { useState } from 'react';
import Input from '../forms/Input'
import search from '../../images/search.png'

export default function Search(props) {

    const { onSubmit } = props;

    const [searchInput, setSearchInput] = useState('');

    const onChange = (e) => setSearchInput(e.target.value);
    

    return (
        <div className="search" tabIndex='1'>
            <Input type='search' onChange={onChange} placeholder='Search Hooter' />
            <button type='submit' className='search-btn' 
            onClick={(e) => onSubmit(e, searchInput)}>
                <img className='search-icon' src={search} alt='search' />
            </button>
        </div>
    )
}