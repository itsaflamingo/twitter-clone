
export default function TweetInput(props) {
    
    const { type, setInput, input, ariaLabel } = props;

    const setTweetInput = (e) => setInput(e.target.value);

    return (
        <div id='tweet-container'>
            <form
            aria-label='Create Tweet'
            name="makeTweetForm"
            >
                <label htmlFor='tweet' />
                <input 
                type={type}
                id='tweet' 
                value={input}
                name='make tweet'
                placeholder="What's happening?"
                onChange={(e) => setTweetInput(e)}
                aria-label={ariaLabel} />
            </form>
        </div>
    )
}