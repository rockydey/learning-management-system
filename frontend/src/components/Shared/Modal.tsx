"use client";

import { IoMdCloseCircle } from "react-icons/io";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  children,
  width = "450px",
}) => {
  if (!isVisible) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex justify-center items-center p-1 w-full"
      onClick={handleClose}
      id="wrapper"
    >
      <div
        style={{ width }}
        className="w-full md:max-w-[90%] max-w-[95%] mx-auto sm:max-w-[85%]  flex flex-col gap-5"
      >
        <div className="bg-white rounded-xl px-4 py-3 flex flex-col gap-2 items-center ">
          <button
            onClick={onClose}
            className="place-self-end text-secondary rounded-full cursor-pointer"
          >
            <IoMdCloseCircle size={30} />
          </button>
          <div className="w-full px-2 md:px-6 justify-center items-center flex">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
