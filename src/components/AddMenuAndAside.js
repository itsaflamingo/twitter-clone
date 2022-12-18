import Menu from "./Menu"
import Trending from "./Trending";

export default function AddMenuAndAside(WrappedComponent) {
    return function EnhanceComponent() {
        
    return(
        <div id='app'>
            <Menu />
            <WrappedComponent />
            <Trending />
        </div>
    )}

}