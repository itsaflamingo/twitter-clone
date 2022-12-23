import getDate from "./getDate"

export default function addUserInfo(user) {
    if('followers' in user === false) {
        return user = {...user, 
            personalInfo: {
                hasAccount: false,
                description: '',
                dateJoined: getDate(),
                location: '',
                handle: '',
                profileInfo: {
                    followers: 0,
                    following: 0,
                    likes: 0,
                    profilePicture: '',
                    coverPhoto: '',
                }
            },
        }
    }
}