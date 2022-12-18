import { useState } from 'react'
import defaultPicture from '../images/twitter-user-default.png'

function useChangeProfilePicture() {
    
    const [picture, setPicture] = useState(defaultPicture);

    return picture;
}

export { useChangeProfilePicture };