import {useState, useEffect, useRef, useCallback} from 'react'
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import '@/app/toast/index.css'


const Toast = ({
    id = 0,
    title = "Default Title",
    description = "Default Message",
    type = "info",
    icon,
    action,
    time = 5000
}) => {

    const toastRef = useRef(null)
    const useToastRef = useRef(null)
    const toastProgress = useRef(null)
    const [isShowToast, setIsShowToast] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false);

    const onClose = useCallback(() => {
        console.log('onClose', useToastRef.current);
        console.dir(toastProgress.current)
        useToastRef.current.hide()
    }, [])

    // 載入 bootstrap 
   useEffect(() => {
    console.log(1);
    
    import('bootstrap').then((bootstrap) => {
        useToastRef.current = new bootstrap.Toast(toastRef.current)
        setIsInitialized(true); // 更新狀態，表示初始化完成
    })
   }, [])

   useEffect(() => {
    if(isInitialized) {
        const currentToast = toastRef.current;
        useToastRef.current._config.delay = time
        console.log(useToastRef.current);
        
        // // useToastRef.current._config.autohide = true
        useToastRef.current.show(); 
        currentToast.addEventListener('show.bs.toast', () => {
            setIsShowToast(true)
            // progressBar.style.animation = `progressBar ${time / 1000}s linear forwards`;
        })

        currentToast.addEventListener('shown.bs.toast', () => {
            const progressBar = toastProgress.current
            progressBar.style.animation = `progressBar ${time / 1000}s linear forwards`;
            console.log('show.bs.toast', progressBar);
        })
        console.log(2, useToastRef.current, time);
        currentToast.addEventListener('hidden.bs.toast', onClose)

        // // 停止監聽
        return () => {
            useToastRef.current.dispose()
            currentToast.removeEventListener('hidden.bs.toast', onClose)    
        }
    }
   }, [isInitialized, onClose, time])


    return (
        <>
            <div ref={toastRef} className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    {/* <img src="..." className="rounded me-2" alt="..."> */}
                    <strong className="me-auto"> {title} / {id} </strong>
                    {/* <small>11 mins ago</small> */}
                    <button
                        type="button"
                        className="btn-close"
                        // data-bs-dismiss="toast"
                        aria-label="Close"
                        onClick={action || onClose}
                    />
                </div>
                <div className="toast-body">
                    {description}
                </div>
                <div ref={toastProgress} className="toast-progress"></div>
            </div>
        </>
    )
}

Toast.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.node,
    action: PropTypes.func,
    time: PropTypes.number,
}

export default Toast;