export default function UserInfo({ user }) {

    return (
        <div className="user-info">
            <p className='name'>{user.personalInfo.name}</p>
            <p className='font-grey'>@{user.personalInfo.handle}</p>
            </div>
    )
}