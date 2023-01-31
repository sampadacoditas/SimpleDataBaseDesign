import React, { useContext } from "react";
import { AppContext } from '../Context/AppContext';
import styles from "./Layout.module.scss";
import AddPopupModal from "../Components/AddPopupModal/AddPopupModal";
import EditPopupModal from "../Components/EditPopupModal/EditPopupModal";
import { PopupContext } from "../Context/PopupContext/PopupContext";
import DeletePopUp from "../Components/DeletePopup/DeletePopUp";
import Modal from "../Components/Modal/Modal";
import RoutesComp from "../Routes/RoutesComp";
import Popup from "../Components/popup/Popup";
import { ToastContainer } from "react-toastify";
import { RelationShipModal } from "../Components/RelationShipModal/RelationShipModal";

const Layout: React.FC = () => {
  const { appState } = useContext(AppContext);
  const { toggleTheme, popupData } = appState
  const { theme } = toggleTheme
  const { popupState } = useContext(PopupContext);

  return (
    <div className={styles.LayoutContainer} data-theme={theme}>
      <>
        <RoutesComp />
      </>
      <div>
        {
          popupState.isPopupOpen &&
          <Modal>
            {popupState.actionType === "create" && <AddPopupModal />}
            {popupState.actionType === "edit" && <EditPopupModal />}
            {popupState.actionType === "delete" && <DeletePopUp />}
            {popupState.actionType === "relationship" && <RelationShipModal/>}
          </Modal>
        }
      </div>
      {popupData.showMessage && <Popup message={popupData.message} status={popupData.status} />
      }
      <ToastContainer />
    </div>
  );
}

export default Layout;