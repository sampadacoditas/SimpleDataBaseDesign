import { Button } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { PopupContext } from "../../Context/PopupContext/PopupContext";
import http from "../../Services/module.service";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeSelector from "../../utils/constants";
import styles from "./RelationShipModal.module.scss";

export const RelationShipModal: React.FC = () => {
  const { storeArray } = useContext(AppContext);
  const { popupState } = useContext(PopupContext);
  const { selectedData} = popupState;
  const [getrelation, setRelationship] = useState<[]>([]);
  const [getData, setGetData] = useState<[]>([]);
  const toastObject = ThemeSelector();
  const [targetColumnName,setTargetColumnName]=useState<number>(1)
  const [isDisabled, setIsDisabled] = useState(true);

  const formikProps = {
    initialValues: {
      sourceTableId: selectedData.id,
     targetTableId: "",
     relationshipType: 1,
     targetColumnName:""
    },
    onSubmit: (values: Record<any, any>) => {
     const data={...values, modifiedBy:"Pranjali",targetTableId:+values.targetTableId,relationshipType:+targetColumnName}
     console.log(data)
      handleSubmit(data);
    },
  };
  const getTablesData = async () => {
    try {
      const res = await http.get(
        `tables/exercise-tables/${storeArray[storeArray.length - 2].id}`
      );
      setGetData(res);
      if (res.statusCode === 404) {
        toast.error(`${res.message}`, toastObject);
      }
      return res;
    } catch (Error) {
      toast.error(`${Error}`, toastObject);
      throw Error;
    }
  };
  const getRelationShipDropDown = async () => {
    try {
      const res = await http.get(
        `relationship-parameter`
      );
      setRelationship(res)
      if (res.statusCode === 404) {
        toast.error(`${res.message}`, toastObject);
      }
      return res;
    } catch (Error) {
      toast.error(`${Error}`, toastObject);
      throw Error;
    }
  };
  useEffect(() => {
    getTablesData();
    getRelationShipDropDown()
  }, []);

  const handleSubmit = async(values: Record<number, string>) => {
   console.log(values)
    try {
      const res = await http.post("relationships",values);
      console.log(res);
      if (res.statusCode === 500) {
        toast.error(`${res.message}`, toastObject);}
        else if(res.status===202)
        {
          toast.info('Relationship Added!', toastObject)
        }
      return res;
    } catch (Error) {
      console.log("et")
      toast.error(`${Error}`, toastObject);
      throw Error;
    }
  };
  function handleChange(event:any) {
    console.log(event)
    setTargetColumnName(event.target.value);
    if(event.target.value!=="1")
    {
      setIsDisabled(false)
    }
    else if(event.target.value==="1")
    {
      setIsDisabled(true)
    }
  }
  
  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>Add Relationship {popupState.typeOfFile}</h3>
      <div className={styles.form}>
        <Formik
          {...formikProps}
        >
          <Form>
            <div className={styles.formFieldContainer}>
              <div className={styles.sourceTable}>
                <label className={styles.heading}>Source Table</label>
                <Field
                  type="text"
                  placeholder="Enter Name"
                  name="sourceTable"
                  className={styles.field}
                  value={selectedData.name}
                  disabled
                />
              </div>
              <div className={styles.targetTable}>
                <label className={styles.heading}>Target Table</label>
                <Field name="targetTableId" component="select" className={styles.field} required>
                <option value="" selected disabled>choose option</option>
                  {getData?.map((item: any, index: any) => {
                    return (
                      <>
                        {selectedData.id !== item.id && (
                          <option value={Number(item.id)} key={index}>
                            {item.tableName}
                          </option>
                        )}
                      </>
                    );
                  })}
                </Field>
              </div>
              <div className={styles.relationShip}>
                <label className={styles.heading}>RelationShip</label>
                <select name="relationshipType" onChange={(event)=>handleChange(event)} className={styles.field} required>
                {getrelation?.map((item: any) => {
                    return (
                      <>
                        <option value={+(item.id)}>{item.name}</option>
                      </>
                    );
                  })}
                </select>

              </div>
              {
                 !isDisabled &&
              <div className={styles.foreignKeyName}>
                <label className={styles.heading}>Field Name</label>
                <Field
                  type="text"
                  placeholder="Enter Field Name"
                  name="targetColumnName"
                  className={styles.field}
                  required
                />
              </div>
              }
              <div className={styles.button}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={styles.submit}
                  size="small"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
