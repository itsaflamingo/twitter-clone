export default function CreateTweetOptions(props) {

    const { handleSubmit, ariaLabel, chars } = props;

    return (
        <div className="tweet-options">
            <div className='char-count'>{chars}</div>
            <button 
                type='submit'
                className='submit-tweet'
                aria-label={ariaLabel}
                onClick={(e) => handleSubmit(e)}>Hoot</button>
        </div>
    )
}