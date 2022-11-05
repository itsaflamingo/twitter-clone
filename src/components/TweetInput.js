

export default function TweetInput(props) {
    const { type } = props;
    return (
        <form>
            <label for='tweet'>Create Tweet</label>
            <input 
            type={type}
            value=''
            id='tweet' />
        </form>
    )
}