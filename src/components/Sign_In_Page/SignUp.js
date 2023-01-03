import { useState } from "react"
import Input from "../Input"
import UploadPicture from "./UploadPicture";

export default function SignUp(props) {

    const { saveToDatabase, user } = props;
    
    const [profileInfo, setProfileInfo] = useState({
        hasAccount: true,
        name: '',
        handle: '',
        description: '',
        photoURL: ''
    });

    const onChangeInput = (e) => {
        const type = e.target.id;

        switch(type) {
            case 'Full Name': 
                setProfileInfo({...profileInfo, name: e.target.value})
                break;
            case 'Handle':
                setProfileInfo({...profileInfo, handle: e.target.value})
                break;
            case 'Description':
                setProfileInfo({...profileInfo, description: e.target.value})
                break;
            case 'Profile Picture':
                setProfileInfo({...profileInfo, photoURL: e.target.value})
                break;
            default: return;
        }
    } 

    return (
        <div id='sign-up'>
            <form>
                <UploadPicture />
                <div id='add-name'>
                    <Input type='text' onChange={onChangeInput} id='Full Name' />
                </div>
                <div id='add-handle'>
                    <Input type='text' onChange={onChangeInput} id='Handle' />
                </div>
                <div id='add-description'>
                    <Input type='textarea' onChange={onChangeInput} id='Description' />
                </div>
                <button type='submit'
                onClick={(e) => saveToDatabase(e, user, profileInfo)}>Submit</button>
            </form>
        </div>
    )
}