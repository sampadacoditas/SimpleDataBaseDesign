import http from "../Services/module.service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastObject: object = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
}

export const FileManagerData = async (type: string, id: string = "") => {

  switch (type) {
    case "Global":
      return {
        type: "Global",
        data: await getGlobalData()
      }

    case "Project":
      return {
        type: "Project",
        data: await getExcerciseData(id)
      }

    case "Excercise":
      return {
        type: "Excercise",
        data: await getTablesData(id)
      }

    case "Table":
      return {
        type: "Table",
        data: []
      }

    default: {
      return
    }
  }
}

const getGlobalData = async () => { //Type Global
  try {
    const res = await http.get("projects/projectsExercises/globalData");
    if (res.statusCode === 404) {
      toast.error(`${res.message}`,);
    }
    return res
  }
  catch (Error) {
    toast.error(`${Error}`, toastObject);
    throw Error
  }
}

const getExcerciseData = async (id: string) => { //Type:Project
  try {
    const res = await http.get(`exercises/exercises-project/${id}`);
    if (res.statusCode === 404) {
      toast.error(`${res.message}`, toastObject);
    }
    return res
  }
  catch (Error) {
    toast.error(`${Error}`, toastObject);
    throw Error
  }
}

const getTablesData = async (id: string) => {  //Type:Exercise
  try {
    const res = await http.get(`tables/exercise-tables/${id}`)
    if (res.statusCode === 404) {
      toast.error(`${res.message}`, toastObject);
    }
    return res
  }
  catch (Error) {
    toast.error(`${Error}`, toastObject);
    throw Error
  }
}