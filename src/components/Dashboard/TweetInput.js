
export default function TweetInput(props) {
    
    const { type, setInput, input, ariaLabel, setChars, chars } = props;

    const setTweetInput = (e) => {
        let charsCount = chars;
        setInput(e.target.value);
        const charLength = input.length;
        setChars(charsCount - 1);
    };

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