"use client";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import ReactDOM from "react-dom";
import ToastComponent from "@/components/Toast";

// 1. 創建 ToastContext
const ToastContext = createContext();

// 2. 自定義 Hook：讓使用者更方便地讀取 Context 的值
export const useToast = () => useContext(ToastContext);

// 3. 建立 ToastManager 組件
const ToastManager = ({ children }) => {
    console.log("ToastManager rendered");
    const [toasts, setToasts] = useState([]); // 管理所有 Toast 的狀態
    const [portalContainer, setPortalContainer] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
        console.log('djsjk');
        
      setPortalContainer(document.body); // 確保 document.body 存在
    }
  }, []);
  useEffect(() => {
    console.log('portalContainer', portalContainer);
    
  }, [portalContainer]);

    const toastIdRef = useRef(0); // 使用 useRef 來儲存 id
    // 添加新 Toast
    const open = ({ title, message, type, time }) => {
        const id = toastIdRef.current ++; // 確保每個 Toast 有唯一的 ID
        setToasts((prevToasts) => [
        ...prevToasts,
        { id, title, message, type, time },
        ]);
    };

    // 移除特定 Toast
    const close = (id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };


    return (
        <ToastContext.Provider value={{ open, close }}>
            {children}
            {/* {portalContainer &&
            ReactDOM.createPortal( */}
            <div className="toast-container position-fixed top-0 start-50 translate-middle-x">
                {toasts.map((toast) => (
                <ToastComponent
                    key={toast.id}
                    {...toast}
                    onRemove={() => close(toast.id)}
                />
                ))}
            </div>
            {/* )} */}
        </ToastContext.Provider>
    )
}
export default ToastManager;