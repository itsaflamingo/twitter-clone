import Menu from "./Menu"
import RecommendedUsers from "./RecommendedUsers";

export default function AddMenuAndAside(WrappedComponent) {
    return function EnhanceComponent() {
        
    return(
        <div id='app'>
            <Menu />
            <WrappedComponent />
            <RecommendedUsers />
        </div>
    )}

}