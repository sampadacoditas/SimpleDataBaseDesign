import { useContext } from "react";
import styles from "./Header.module.scss";
import { AppContext } from "../../Context/AppContext";
import MaterialUISwitch from "../switch/MUISwitch";
import Button from "@mui/material/Button";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeSelector from "../../utils/constants";

const Header: React.FC = () => {
  const { navigate, appState, appDispatch } = useContext(AppContext);
  const { toggleTheme } = appState
  const { theme } = toggleTheme

  const toastObject = ThemeSelector();

  const toggletheme = () => {
    appDispatch({
      type: "setTheme", payload: {
        theme: appState.toggleTheme.theme === "dark" ? "light" : 'dark'
      }
    });
    toast.info(`Switched to ${theme === "dark" ? "light" : 'dark'} theme!`, toastObject);
  }

  const logout = () => {
    navigate("/");
    appDispatch({ type: "setPopupData", payload: { showMessage: true, message: `Logged Out`, status: "error" } });
    setTimeout(() => {
      appDispatch({ type: "setPopupData", payload: { showMessage: false, message: "" } })
    }, 2000);
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.heading}>
          {
            theme === "light" ?
              <img src="logo.png" alt="logo" className={styles.logo} onClick={() => window.location.reload()} /> :
              <img src="darkLogo.png" alt="logo" className={styles.logo} onClick={() => window.location.reload()} />
          }
        </div>
        <div className={styles.profileContainer}>
          <MaterialUISwitch
            onChange={() => toggletheme()}
          />
          <Button className={styles.logout} onClick={() => logout()}>Logout</Button>
        </div>
      </div>
    </>
  )
}

export default Header