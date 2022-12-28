export default function CreateTweetOptions(props) {
    const { handleSubmit } = props;
    return (
        <div className="tweet-options">
            <button 
                type='submit'
                className='submit-tweet'
                onClick={(e) => handleSubmit(e)}>Tweet</button>
        </div>
    )
}