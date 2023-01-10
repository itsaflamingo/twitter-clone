import getDateTime from "../getDateTime"

export default function addUserInfo(user) {
    if('followers' in user === false) {
        return user = {...user, 
            personalInfo: {
                hasAccount: false,
                description: '',
                dateJoined: getDateTime().getOnlyDate(),
                location: '',
                handle: '',
                profileInfo: {
                    followers: [],
                    following: [],
                    likes: 0,
                    profilePicture: '',
                    coverPhoto: '',
                }
            },
        }
    }
}