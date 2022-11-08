
export default function TweetCounterWrapper(WrappedComponent) {
    return function Counter() {
        return (
            <WrappedComponent />
        )
    }
}