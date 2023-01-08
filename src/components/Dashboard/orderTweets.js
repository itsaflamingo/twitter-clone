export default function orderTweets(copyTweets, tweets) {
    if(tweets === undefined) return;
    const finalArr = [];

    while(finalArr.length < tweets.length) {
        const lowestValue = copyTweets.reduce((a, b) => {
            if(a.spot >= b.spot) {
                return a
            }
            else {
                return b
        }});
        copyTweets.splice(copyTweets.indexOf(lowestValue), 1);
        finalArr.push(lowestValue)
    }
    return finalArr;
}