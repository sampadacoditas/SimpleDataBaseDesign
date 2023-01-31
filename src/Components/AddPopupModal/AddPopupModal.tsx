import { Button } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useContext } from "react";
import { PopupContext } from "../../Context/PopupContext/PopupContext";
import http from "../../Services/module.service";
import styles from "./AddPopupModal.module.scss";
import { AppContext } from "../../Context/AppContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeSelector from "../../utils/constants";

const AddPopupModal: React.FC = () => {
  const { handlePageNavigate } = useContext(AppContext);
  const { popupState, popupDispatch } = useContext(PopupContext);
  const { selectedData, typeOfFile } = popupState;
  const toastObject = ThemeSelector();

  const formikProps = {
    initialValues: {
      name: ""
    },
    onSubmit: (values: Record<string, string>) => {
      handleSubmit(values);
    }
  }

  const postCreateData = (url: string, data: Record<string, string>) => {
    http.post(url, data).then((res) => {
      toast.success(`${res.message}`, toastObject);
      handlePageNavigate(selectedData.type, selectedData.id, selectedData.name)

    }).catch((error) => {
      toast.error(`${error}`, toastObject);
    })
  }

  const handleSubmit = (values: Record<string, string>) => {
    if (selectedData.type === 'Global') {
      if (typeOfFile === "Project") {
        const data = {
          "projectName": values.name,
        };
        postCreateData("projects", data);
      } else if (typeOfFile === "Exercise") {
        const data = {
          "exerciseName": values.name,
        };
        postCreateData("exercises", data);
      }
    } else if (selectedData.type === 'Project' && typeOfFile === "Excercise") {
      const data = {
        "exerciseName": values.name,
        "projectId": selectedData.id,
      };
      postCreateData("exercises", data);
    } else if (selectedData.type === 'Excercise' && typeOfFile === "Table") {
      const data = {
        "tableName": values.name,
        "exerciseId": selectedData.id,
      };
      postCreateData("tables", data);
    }
    popupDispatch({ type: "setPopup", payload: { isPopupOpen: false } });
  }

  return (
    <div className={styles.formContainer}>
      <h3>Add New {popupState.typeOfFile}</h3>
      <Formik {...formikProps}>
        <Form>
          <div className={styles.formFieldContainer}>
            <Field
              type="text"
              placeholder="Enter Name"
              name="name"
              className={styles.field}
              required
            />
            <Button variant="outlined" color="primary" size="small" type="submit">Submit</Button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}
export default AddPopupModal