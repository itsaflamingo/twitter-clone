export default function TweetInput(props) {
    const { type, setInput, input } = props;

    const setTweetInput = (e) => setInput(e.target.value);

    return (
        <div id='create-tweet'>
            <form>
                <label htmlFor='tweet'>Create Tweet</label>
                <input 
                type={type}
                id='tweet' 
                value={input}
                onChange={(e) => setTweetInput(e)} />
            </form>
        </div>
    )
}