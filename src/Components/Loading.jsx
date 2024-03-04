import ReactDOM from "react-dom";
const Loading = () => {
    return ReactDOM.createPortal(
        <>
        <div className="loader-overlay">Loading...</div>
        </>,
        document.getElementById("loader-root")
    );
}
export default Loading;