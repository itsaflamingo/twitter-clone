import getDate from "./getDate"

export default function addUserInfo(user) {
    if('followers' in user === false) {
        return user = {...user, 
            followers: 0,
            following: 0,
            likes: 0,
            profilePicture: '',
            coverPhoto: '',
            personalInfo: {
                description: '',
                dateJoined: getDate(),
                location: '',
                handle: ''
            }
        }
    }
}