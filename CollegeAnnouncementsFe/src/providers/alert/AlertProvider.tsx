import { ToastContainer } from "react-toastify";

export function AlertProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      pauseOnFocusLoss={false}
      closeButton={false}
      closeOnClick
      draggable
      pauseOnHover
      theme="colored"
    />
  );
}
