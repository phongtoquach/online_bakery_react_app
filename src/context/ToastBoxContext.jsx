import { createContext, useEffect, useState, useRef } from "react";

import ToastBox from "../components/ToastBox";

const ToastBoxContext = createContext();

export function ToastBoxProvider({ children }) {

    const [toast, setToast] = useState({
        show: false,
        type: "success",
        title: "",
        content: null
    });

    const hideTimer = useRef(null);

    // Bắt đầu timer auto hide
    function startHideTimer() {
        clearTimeout(hideTimer.current);

        hideTimer.current = setTimeout(() => {
            hideToast();
        }, 4000);
    }

    // Hiển thị Toast
    function showToast(toastType, ToastTitle, ToastContent) {
        clearTimeout(hideTimer.current);

        setToast({
            show: true,
            type: toastType,
            title: ToastTitle,
            content: ToastContent
        });

        startHideTimer();
    }

    // Ẩn Toast
    function hideToast() {
        clearTimeout(hideTimer.current);

        setToast((currentToast) => ({
            ...currentToast,
            show: false
        }));
    }

    // Hover vào Toast -> dừng timer
    function pauseTimer() {
        clearTimeout(hideTimer.current);
    }

    // Rời chuột khỏi Toast -> chạy timer lại
    function resumeTimer() {
        if (toast.show) {
            startHideTimer();
        }
    }

    useEffect(() => {
        console.log("[ToastBoxProvider] đang chạy useEffect() của ToastBoxProvider !");
            
        // hàm cleanup
        return () => {
            console.log("[ToastBoxProvider] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[ToastBoxProvider] ToastBoxProvider được render ! Value của biến useRef hideTimer :");
    console.log(hideTimer);

    return (
        <ToastBoxContext.Provider value={{ showToast }}>
            {children}

            <ToastBox
                toast={toast}
                hideToast={hideToast}
                pauseTimer={pauseTimer}
                resumeTimer={resumeTimer}/>
        </ToastBoxContext.Provider>
    )
}

export default ToastBoxContext;