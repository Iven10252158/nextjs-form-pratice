"use client"; // 需要在客戶端執行
import  { useToast } from "@/components/ToastManager";
const Toast = () => {
    console.log('useToast', useToast());
    const { open } = useToast()

    const handleShowToast = () => {
        open({
          title: "Success",
          message: "This is a test toast message.",
          type: "success",
          time: 5000,
        });
      };
    return (
        <>
        <div className='bg-black py-4'>
            {'toast '}
            <button onClick={handleShowToast}>Show Toast</button>
        </div>
        </>
    )
}

export default Toast;