import { useContext } from "react";
import { PopupContext } from "../../Context/PopupContext/PopupContext";
import styles from "./Modal.module.scss";
import { IModalProps } from "./Modal.types";

const Modal = ({ children }: IModalProps) => {

  const { popupDispatch } = useContext(PopupContext);
  return (
    <>
      <div
        className={styles.modal_container}
        onClick={(event) => {
          if (event.currentTarget === event.target) {
            popupDispatch({ type: "setPopup", payload: { isPopupOpen: false } });
          };
        }}
      >
        <div className={styles.popup_container}>
          {children}
        </div>
      </div>
    </>
  );
};
export default Modal;
