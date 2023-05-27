export default function checkIsUserInDatabase(user, users) {
    // Returns array with nested object
    const thisUser = users.filter((obj) => obj.email === user.email);
    if(thisUser.length === 0) return false;
    return thisUser[0];
}