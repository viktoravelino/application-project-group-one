interface ModalProps {
  show: boolean;
  onClose?: () => void;
  children?: any;
}

export const Modal = ({ show, children }: ModalProps) => {
  return (
    <>
      {show && (
        <div
          className="modal fixed top-0 left-0 bg-black bg-opacity-60 w-screen h-screen z-50 overflow-auto
      flex justify-center items-center text-white dark:text-gray-700"
        >
          <div className="modal-content bg-gray-700 p-4 w-10/12 rounded-lg  md:max-w-md dark:bg-gray-300" >
            {children}
          </div>
        </div>
      )}
    </>
  );
};
