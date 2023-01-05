import { useEffect, useState } from "react"
import hasProfanity from "../hasProfanity";
import Input from "../Input"
import UploadPicture from "./UploadPicture";
import validator from 'validator'

export default function SignUp(props) {

    const { saveToDatabase, user } = props;
    
    const [profileInfo, setProfileInfo] = useState({
        hasAccount: true,
        name: '',
        handle: '',
        description: '',
        photoURL: ''
    });

    const [errors, setErrors] = useState({
        nameError: '',
        handleError: '',
        descriptionError: '',
        linkError: ''
    });

    const [isNotClickable, setIsNotClickable] = useState('notClickable');

    useEffect(() => {
        validateForm();
    }, [profileInfo])

    useEffect(() => {
        validateForm();
    }, [errors])

    const onChangeInput = (e) => {
        const type = e.target.id;
        const word = e.target.value;

        switch(type) {
            case 'Full Name': 
                if(hasProfanity(word) === true) {
                    setErrors({
                        ...errors,
                        nameError: 'Please enter a valid name'
                    })
                    return;
                }
                else {
                    setProfileInfo({...profileInfo, name: word})
                    setErrors({
                        ...errors,
                        nameError: ''
                    })
                }
                break;
            case 'Handle':
                if(hasProfanity(word) === true) {
                    setErrors({
                        ...errors,
                        handleError: 'Please enter a valid handle'
                    })
                    return;
                }
                else {
                    setProfileInfo({...profileInfo, handle: word});
                    setErrors({
                        ...errors,
                        handleError: ''
                    });
                }
                break;
            case 'Description':
                if(hasProfanity(word) === true) {
                    setErrors({
                        ...errors,
                        descriptionError: 'Please enter a valid description'
                    });
                    return;
                }
                else {
                    setProfileInfo({...profileInfo, description: word});
                    setErrors({
                        ...errors,
                        descriptionError: ''
                    });
                }
                break;
            case 'Add Image URL':
                if(validator.isURL(word)) {
                    setProfileInfo({...profileInfo, photoURL: word})
                    setErrors({
                        ...errors,
                        linkError: ''
                    });
                }
                else {
                    setErrors({
                        ...errors,
                        linkError: 'Please enter a valid URL'
                    });
                    return;
                }

                break;
            default: return;
        }
    } 

    const validateForm = () => {
        if( errors.nameError.length > 0 || 
            errors.handleError.length > 0 || 
            errors.descriptionError.length > 0 || 
            profileInfo.name.length === 0 || 
            profileInfo.handle.length === 0 || 
            profileInfo.description.length === 0 ) {
                setIsNotClickable('notClickable'); 
            }
        else {
            setIsNotClickable('clickable');
        }
    }

    return (
        <div id='sign-up'>
            <form>
                <div className="upload-picture-container">
                    <UploadPicture />
                    <span className='add-img-text'>Click To Add Image</span>
                </div>
                <div id='add-name'>
                    <span className='error'>{errors.nameError}</span>
                    <Input type='text' onChange={onChangeInput} id='Full Name' pattern='/^[a-zA-Z]+ [a-zA-Z]+$/' />
                </div>
                <div id='add-handle'>
                    <span className='error'>{errors.handleError}</span>
                    <Input type='text' onChange={onChangeInput} id='Handle' />
                </div>
                <div id='add-description'>
                    <span className='error'>{errors.descriptionError}</span>
                    <Input type='textarea' onChange={onChangeInput} id='Description' />
                </div>
                <div id='add-URL'>
                    <span className='error'>{errors.linkError}</span>
                    <Input type='url' onChange={onChangeInput} id='Add Image URL' />
                </div>
                <button type='submit'
                onClick={(e) => saveToDatabase(e, user, profileInfo)}className={isNotClickable}>Submit</button>
            </form>
        </div>
    )
}