import hasProfanity from "./hasProfanity";

export default function addUserInfoToUser(e, user, userInfo) {
    e.preventDefault();

    if (hasProfanity(userInfo.name) === true || 
        hasProfanity(userInfo.handle) === true ||
        hasProfanity(userInfo.description) === true) return;

    const { profilePicture, coverPhoto, ...rest} = userInfo;
    
    return {
        ...user,
        personalInfo: {
            ...user.personalInfo,
            ...rest,
            profileInfo: {
                ...user.personalInfo.profileInfo,
                profilePicture,
                coverPhoto,
            }
        }
    }
}