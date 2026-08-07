import { useContext, useEffect } from "react";

function ToastBox({ toast, hideToast, pauseTimer, resumeTimer }) {

    useEffect(() => {
        console.log("[ToastBox] đang chạy useEffect() của component ToastBox !");
        
        // hàm cleanup
        return () => {
            console.log("[ToastBox] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[ToastBox] component ToastBox render ! Data của toast : ");
    console.log(toast);
   
    return (
        <div className={`toast-box ${toast.type === "success" ? "toast-success" : "toast-error"} ${toast.show ? "show" : ""}`}
            onMouseEnter={pauseTimer}
            onMouseLeave={resumeTimer}>

            <div className="toast-icon">
                <i className={toast.type === "success" ? "fa-solid fa-circle-check" : "fa-solid fa-circle-xmark"}></i>
            </div>

            <div className="toast-content">
                <div className="toast-title">
                    {toast.title}
                </div>

                <div className="toast-message">
                    {toast.content}
                </div>

            </div>

            <button className="toast-close" onClick={hideToast}>
                <i className="fa-solid fa-xmark"></i>
            </button>
        </div>
    )
}

export default ToastBox;