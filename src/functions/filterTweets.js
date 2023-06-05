const filterTweets = (input, allTweets) => allTweets.filter((tweet) => 
    tweet.text.includes(input) || 
    tweet.name.toLowerCase() === input.toLowerCase() || 
    tweet.handle.toLowerCase() === input.toLowerCase());

const filterUserTweets = (tweets, user) => tweets.filter(tweet => tweet.id === user.personalInfo.id);

export { filterTweets, filterUserTweets };