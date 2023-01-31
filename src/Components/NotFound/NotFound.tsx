import styles from "./NotFound.module.scss";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

export const NotFound = () => {
  const { showNotFound, navigate, setshowNotFound } = useContext(AppContext);
  const onNavigate = () => {
    setshowNotFound(false);
    navigate("/");
  };

  return (
    <div className={styles.container}>
        <img src="https://t4.ftcdn.net/jpg/01/98/86/63/360_F_198866399_vQambmqMEK9975X1Yg7686t4nFpSaubL.jpg" alt="404"></img>
      <div className={styles["mainbox"]}>
        <div className={styles["err"]}>4</div>
        <div className={styles["err1"]}>0</div>
        <div className={styles["err2"]}>4</div>
      </div>
      <div className={styles["msg"]}>
        <p className={styles.error}>{showNotFound.message}</p>
        <p className={styles.link_text}>Let's go
          <span onClick={() => onNavigate()} className={styles.link}> Login </span>
          and try again...
        </p>
      </div>
    </div>
  );
};

export default NotFound