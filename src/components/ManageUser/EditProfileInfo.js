import { useEffect, useState } from "react"
import hasProfanity from "../../functions/hasProfanity";
import Input from "../forms/Input"
import UploadPicture from "../Sign_In_Page/UploadPicture";
import validator from 'validator'

export default function EditProfileInfo(props) {

    const { saveToDatabase, user, setShowEditInfo, setUserUpdated } = props;
    const userExists = user.personalInfo.hasOwnProperty('name');
    
    const [profileInfo, setProfileInfo] = useState({
        hasAccount: true,
        name: '',
        handle: '',
        description: '',
        profilePicture: '',
        coverPhoto: ''
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
            case 'Add Profile Picture':
                if(validator.isURL(word)) {
                    setProfileInfo({...profileInfo, profilePicture: word})
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
            case 'Add Cover Photo':
                if(validator.isURL(word)) {
                    setProfileInfo({...profileInfo, coverPhoto: word})
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

    const submitInfo = (e) => {
        e.preventDefault();
        saveToDatabase(e, user, profileInfo);
        setUserUpdated(true);
        setShowEditInfo(false);
    }

    return (
        <div id='sign-up'>
            <form>
                <div className="upload-picture-container">
                    <UploadPicture />
                </div>
                <div id='add-name'>
                    <span className='error'>{errors.nameError}</span>
                    <Input type='text' onChange={onChangeInput} id='Full Name' pattern='/^[a-zA-Z]+ [a-zA-Z]+$/' placeholder='Jane Doe' />
                </div>
                <div id='add-handle'>
                    <span className='error'>{errors.handleError}</span>
                    <Input type='text' onChange={onChangeInput} id='Handle' placeholder='' />
                </div>
                <div id='add-description'>
                    <span className='error'>{errors.descriptionError}</span>
                    <Input type='textarea' onChange={onChangeInput} id='Description' placeholder='' />
                </div>
                <div id='add-URL'>
                    <span className='error'>{errors.linkError}</span>
                    <Input type='url' onChange={onChangeInput} id='Add Profile Picture' placeholder='https://www.fakelink.com' />
                </div>
                <div id='add-cover-photo'>
                <span className='error'>{errors.linkError}</span>
                    <Input type='url' onChange={onChangeInput} id='Add Cover Photo' placeholder='https://www.fakelink.com'/>
                </div>
                <button type='submit'
                onClick={(e) => submitInfo(e)}className={isNotClickable}>Submit</button>
            </form>
        </div>
    )
}