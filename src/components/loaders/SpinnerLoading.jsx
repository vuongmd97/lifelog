export default function SpinnerLoading({ hasColor = false }) {
    return <div className={`loader-spinner loader ${!!hasColor ? 'has-color' : ''}`}></div>;
}
