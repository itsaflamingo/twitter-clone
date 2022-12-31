import { useEffect, useState } from 'react';
import FollowButton from '../FollowButton';
import EditProfileButton from '../EditProfileButton';

export default function RenderPersonalOrOtherProfile() {
    const [isPersonal, setIsPersonal] = useState(false);

    useEffect(() => {
        
    }, [])

    if(isPersonal) {
        return <FollowButton />
    }
    else {
        return <EditProfileButton />
    }
}