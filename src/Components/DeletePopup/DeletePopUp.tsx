import { Button } from "@mui/material";
import { useContext } from "react";
import { PopupContext } from "../../Context/PopupContext/PopupContext";
import styles from "./DeletePopUp.module.scss";
import http from "../../Services/module.service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from "../../Context/AppContext";
import ThemeSelector from "../../utils/constants";

const DeletePopUp: React.FC = () => {
  const { popupState, popupDispatch } = useContext(PopupContext);
  const { selectedData, typeOfFile } = popupState;
  const { handlePageNavigate, storeArray } = useContext(AppContext);
  const toastObject = ThemeSelector();

  const deleteData = (url: string) => {
    http.delete(url).then((res) => {
      toast.success(`${res.response}`, toastObject);
      handlePageNavigate(storeArray[storeArray.length - 1].type, storeArray[storeArray.length - 1].id, storeArray[storeArray.length - 1].name)

    }).catch((error) => {
      toast.error(`${error}`, toastObject);
    })
  }

  const handleYes = () => {
    if (typeOfFile === "Project") {
      deleteData(`projects/${selectedData.id}`)
    } else if (typeOfFile === "Excercise") {
      deleteData(`exercises/${selectedData.id}`)
    } else if (typeOfFile === "Table") {
      deleteData(`tables/${selectedData.id}`)
    }

    popupDispatch({ type: "setPopup", payload: { isPopupOpen: false } });
  }
  const handldeNo = () => {
    popupDispatch({ type: "setPopup", payload: { isPopupOpen: false } });
  }
  return (
    <>
      <h3>Are you sure you want to delete?</h3>
      <div className={styles.action}>
        <Button variant="outlined" size="small" color="success" onClick={handleYes}>Yes</Button>
        <Button variant="outlined" size="small" color="error" onClick={handldeNo}>No</Button>
      </div>
    </>
  );
};
export default DeletePopUp;
