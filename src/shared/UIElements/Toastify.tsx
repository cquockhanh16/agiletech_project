import { ToastContainer, Bounce } from "react-toastify";

import React from "react";

const Toastify: React.FC = () => {
  return (
    <ToastContainer
      position='top-right'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
      transition={Bounce}
    />
  );
};

export default Toastify;
