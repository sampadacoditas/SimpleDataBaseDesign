import { Button } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useContext } from "react";
import { PopupContext } from "../../Context/PopupContext/PopupContext";
import styles from "./EditPopupModal.module.scss";
import http from "../../Services/module.service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from "../../Context/AppContext";
import ThemeSelector from "../../utils/constants";

const EditPopupModal: React.FC = () => {
  const { popupState, popupDispatch } = useContext(PopupContext);
  const { selectedData, typeOfFile } = popupState;
  const { handlePageNavigate } = useContext(AppContext);
  const { storeArray } = useContext(AppContext);
  const toastObject = ThemeSelector();

  const formikProps = {
    initialValues: {
      name: selectedData.name
    },
    onSubmit: (values: Record<string, string>) => {
      handleSubmit(values);
    }
  }

  const patchEditData = (url: string, data: Record<string, string>) => {
    http.patch(url, data).then((res) => {
      toast.success(`${res.response}`, toastObject);
      handlePageNavigate(storeArray[storeArray.length - 1].type, storeArray[storeArray.length - 1].id, storeArray[storeArray.length - 1].name)

    }).catch((error) => {
      toast.error(`${error}`, toastObject);
    })
  }


  const handleSubmit = (values: Record<string, string>) => {
    if (typeOfFile === "Project") {
      const data = {
        projectName: values.name
      }
      patchEditData(`projects/${selectedData.id}`, data)
    } else if (typeOfFile === "Excercise") {
      const data = {
        exerciseName: values.name
      }
      patchEditData(`exercises/${selectedData.id}`, data)
    } else if (typeOfFile === "Table") {
      const data = {
        tableName: values.name
      }
      patchEditData(`tables/${selectedData.id}`, data)
    }

    popupDispatch({ type: "setPopup", payload: { isPopupOpen: false } });
  }
  return (
    <div className={styles.formContainer}>
      <h3>Rename {popupState.typeOfFile}</h3>
      <Formik {...formikProps}>
        <Form>
          <div className={styles.formFieldContainer}>
            <Field
              type="text"
              placeholder="Enter Name"
              name="name"
              className={styles.field}
            />
            <Button variant="outlined" color="primary" size="small" type="submit">Submit</Button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}
export default EditPopupModal;