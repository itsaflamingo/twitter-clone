
export default function TweetInput(props) {
    
    const { type, setInput, input, ariaLabel, setChars, chars } = props;

    const setTweetInput = (e) => setInput(e.target.value);

    const handleKeyDown = (e) => {
        if(e.key === "Backspace") {
            return setChars(chars + 1);
        }
        // Ensure key is printable
        else if (e.key.length === 1) {
            return setChars(chars - 1);
        }
    }
    return (
        <div id='tweet-container'>
            <form
            aria-label='Create Tweet'
            name="makeTweetForm"
            >
                <label htmlFor='tweet' />
                <textarea 
                type={type}
                id='tweet' 
                value={input}
                name='make tweet'
                placeholder="What's happening?"
                onChange={(e) => setTweetInput(e)}
                onKeyDown={(e) => handleKeyDown(e)}
                aria-label={ariaLabel} />
            </form>
        </div>
    )
}