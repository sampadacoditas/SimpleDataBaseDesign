import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Slide } from 'react-toastify';


export const options = [
  { value: 'name', label: 'Name' },
  { value: 'created_at', label: 'Created At' },
  { value: 'updated_at', label: 'Modified At' },
]

export const folderSizeData = [
  { value: '50,10', label: 'Small' },
  { value: '70,15', label: 'Medium' },
  { value: '100,18', label: 'Large' },
]

const ThemeSelector: any = () => {
  const { appState } = useContext(AppContext);

  const toastObject = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: appState.toggleTheme.theme === "dark" ? "light" : 'dark',
    transition: Slide
  }
  return toastObject
}

export default ThemeSelector