/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useReducer, useState } from "react"
import { useNavigate } from "react-router-dom";
import { appReducer } from "../Reducer/appReducer";
import { FileManagerData } from "../utils/api";
import { IAppContextProps, IDataProps, IStoreArrayProps } from "./AppContext.types";
import { Slide } from 'react-toastify';

export const AppContext = createContext<any>({});

const AppContextProvider: React.FC<IAppContextProps> = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [showNotFound, setshowNotFound] = useState<{ status: boolean, message: string }>({
    status: false,
    message: ""
  });

  const [sort, setSort] = useState<string>('');

  // data driving folderStructure
  const [data, setData] = useState<IDataProps[]>([]);

  // data driving breadcrumb and backButton
  const [storeArray, setStoreArray] = useState<IStoreArrayProps[]>([]);

  const initialState = {
    popupData: {
      showMessage: false,
      message: "",
      status: ""
    },

    toggleTheme: {
      theme: "light"
    },

    loginData: {
      isLogin: true
    }
  }

  const [appState, appDispatch] = useReducer(appReducer, initialState);
  const toastObject = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide
  }

  const getInitialData = async () => {
    setLoading(true)
    try {
      const res = await FileManagerData("Global");
      if (res?.data.statusCode) {
        throw res.data.message
      }
      const updatedValues = setDataValues(res?.data);
      setStoreArray([{ id: 1, type: "Global", name: "Home", data: updatedValues }]);
      setData([{ data: updatedValues, type: res?.type }]);
      setLoading(false)
    }
    catch (Error) {
      setLoading(false)
      setshowNotFound({
        status: true,
        message: `${Error}`
      });
    }
  }

  const setDataValues = (values: [Record<string, string>]) => {
    const projectType = values?.filter((val: Record<string, string>) => val.hasOwnProperty("projectName"))
      .map((val: Record<string, string>) => {
        return {
          ...val,
          type: "Project",
          name: val.projectName
        }
      });

    const excerciseType = values?.filter((val: Record<string, string>) => val.hasOwnProperty("exerciseName"))
      .map((val: Record<string, string>) => {
        return {
          ...val,
          type: "Excercise",
          name: val.exerciseName
        }
      });

    const tableType = values?.filter((val: Record<string, string>) => val.hasOwnProperty("tableName"))
      .map((val: Record<string, string>) => {
        return {
          ...val,
          type: "Table",
          name: val.tableName
        }
      });

    return [...projectType, ...excerciseType, ...tableType]
  }

  const handlePageNavigate = async (type: string, id: string, name: string) => {
    setLoading(true);
    setSort("");
    try {
      const response = await FileManagerData(type, id);
      if (response?.data.statusCode) {
        throw response.data.message
      }
      const updatedValues = setDataValues(response?.data);
      setLoading(false)
      setData([{ data: updatedValues, type: type }])

      if (storeArray[storeArray.length - 1].type !== type) {
        setStoreArray([...storeArray, { id: id, type: type, name: name, data: updatedValues }]);
      } else {
        storeArray[storeArray.length - 1].data = updatedValues
      }
    }
    catch (error) {
      setLoading(false)
      setshowNotFound({
        status: true,
        message: `${Error}`
      });
    }
  }

  const handleCrumbNavigate = async (values: Record<string, string>, index: number) => {
    setSort("");
    if (index > 0) {
      setStoreArray((val: IStoreArrayProps[]) => val.slice(0, index + 1));
      setData([{ data: storeArray[index].data, type: values.type }]);
    }
    else if (index === 0) {
      setStoreArray((val: IStoreArrayProps[]) => val.slice(0, index + 1));
      getInitialData()
    }
  }

  return (
    <AppContext.Provider value={{ appState, appDispatch, navigate, loading, setLoading, data, setData, storeArray, setStoreArray, getInitialData, handlePageNavigate, handleCrumbNavigate, toastObject, sort, setSort, showNotFound, setshowNotFound }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;
