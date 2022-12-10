
export default function TweetInput(props) {
    const { type, setInput, input } = props;

    const setTweetInput = (e) => setInput(e.target.value);

    return (
        <div id='tweet-container'>
            <form>
                <label htmlFor='tweet' />
                <input 
                type={type}
                id='tweet' 
                value={input}
                onChange={(e) => setTweetInput(e)} />
            </form>
        </div>
    )
}