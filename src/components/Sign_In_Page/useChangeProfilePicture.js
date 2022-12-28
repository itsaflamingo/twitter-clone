import { useState, useEffect } from 'react'
import defaultPicture from '../../images/twitter-user-default.png'

function useChangeProfilePicture(insertPicture = 'none') {
    
    const [picture, setPicture] = useState(insertPicture);

    useEffect(() => {
        if(insertPicture === 'none') return setPicture(defaultPicture);
        setPicture(insertPicture);
    }, [insertPicture])

    return picture;
}

export { useChangeProfilePicture };