import getDateTime from "../getDateTime"

export default function addUserInfo(user) {
        return {...user, 
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