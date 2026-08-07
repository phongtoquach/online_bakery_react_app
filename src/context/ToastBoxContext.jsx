import { createContext, useEffect, useState } from "react";

const ToastBoxContext = createContext();

export function ToastBoxProvider({ children }) {

    useEffect(() => {
        console.log("[ToastBoxProvider] đang chạy useEffect() của ToastBoxProvider !");
            
        // hàm cleanup
        return () => {
            console.log("[ToastBoxProvider] đang chạy hàm cleanup của useEffect() !");
        };
    });

    console.log("[ToastBoxProvider] ToastBoxProvider được render !");

    return (
        <ToastBoxContext.Provider value={{ }}>
            {children}
        </ToastBoxContext.Provider>
    )
}

export default ToastBoxContext;