import Dashboard from "./Dashboard"
import Header from "./Header"

export default function HigherOrderComponent(WrappedComponent) {
    return function EnhanceComponent() {
        
    return(
        <div id='app'>
            <Header />
            <WrappedComponent />
        </div>
    )}

}