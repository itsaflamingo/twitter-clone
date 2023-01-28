export default function CreateTweetOptions(props) {
    const { handleSubmit, ariaLabel } = props;
    return (
        <div className="tweet-options">
            <button 
                type='submit'
                className='submit-tweet'
                aria-label={ariaLabel}
                onClick={(e) => handleSubmit(e)}>Tweet</button>
        </div>
    )
}