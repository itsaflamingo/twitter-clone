export default function determineTweetOrderNumber(tweets) {
    if(tweets === undefined || tweets.length === 0) {
        return 0;
    }
    const lastTweet = tweets[tweets.length-1].spot;
    return lastTweet + 1;
}