export default function addToSetTweets(state, action) {
    switch(action.type) {
        case 'add tweet': 
        return {
            state: [...state.state, action.value]
        };
        default: return;
    }
}