export default function determineTweetOrderNumber(tweets) {
    if(tweets === undefined || tweets.length === 0) {
        return 0;
    }
    const lastTweet = tweets[0].spot;
    return lastTweet + 1;
}