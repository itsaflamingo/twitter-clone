import HigherOrderComponent from "./HigherOrderComponent";
import CreateTweet from './CreateTweet'
import DisplayTweets from "./DisplayTweets";

function Dashboard() {

    

    return(
        <div id='dashboard'>
            <CreateTweet />
            <DisplayTweets />
        </div>
    )
}

export default HigherOrderComponent(Dashboard);

