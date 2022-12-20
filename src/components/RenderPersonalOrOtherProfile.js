import { useEffect, useState } from 'react';
import { renderTo } from 'react-dom';
import FollowButton from './FollowButton';
import EditProfileButton from './EditProfileButton';

export default function RenderPersonalOrOtherProfile() {
    const [isPersonal, setIsPersonal] = useState(false);

    useEffect(() => {
        
    }, [])

    const checkIfPersonal = () => {
        
    }

    if(isPersonal) {
        return <FollowButton />
    }
    else {
        return <EditProfileButton />
    }
}