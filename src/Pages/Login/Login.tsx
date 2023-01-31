import React, { BaseSyntheticEvent, useContext, useState } from "react";
import styles from "./Login.module.scss";
import { AppContext } from "../../Context/AppContext";
import useFormValidation from "../../hooks/useFormValidation";
import { getFormData } from "../../utils/FormData";
import http, { setStore } from "../../Services/module.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import ThemeSelector from "../../utils/constants";

const Login: React.FC = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const { appDispatch, navigate } = useContext(AppContext);
  const { handleFormChange, showError, handleFormSubmit } = useFormValidation();
  const toastObject = ThemeSelector();

  const submitForm = async (event: BaseSyntheticEvent) => {
    event.preventDefault();
    handleFormSubmit(event);
    const data = await getFormData(event);
    try {
      const res = await http.post("auth/login", data);
      if (res.statusCode !== 401) {
        appDispatch({
          type: "setPopupData",
          payload: {
            showMessage: true,
            message: `Login Successfull!`,
            status: "success",
          },
        });
        setStore("token", res.access_token);
        appDispatch({ type: "setLoginData", payload: { isLogin: true } });
        navigate("/home");
      } else {
        appDispatch({
          type: "setPopupData",
          payload: { showMessage: true, message: res.message, status: "error" },
        });
      }
      setTimeout(() => {
        appDispatch({
          type: "setPopupData",
          payload: { showMessage: false, message: "" },
        });
      }, 2000);
    } catch (Error) {
      toast.error(`${Error}`, toastObject);
    }
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.item}></div>
        <div className={styles.item}>
          <div className={styles.center}>
          </div>
          <div className={styles.center}>
            <h1 className={styles.loginHeading}>Login</h1>
            <form className={styles.loginForm} onSubmit={submitForm}>
              <div className={styles["text-field"]}>
                <input
                  className={styles.input}
                  type="text"
                  name="username"
                  id="email"
                  onBlur={handleFormChange}
                  autoComplete="current-email"
                />
                {showError.email && (
                  <p className={styles.error}>{showError.email}</p>
                )}
                <span></span>
                <label htmlFor="email" className={styles.label}>Email</label>
              </div>
              <div className={styles["text-field"]}>
                <input
                  className={styles.input}
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="current-password"
                />
                <i className={styles.eyeIcon} onClick={togglePasswordVisiblity}>
                  {
                    passwordShown ? <FaEyeSlash /> : <FaEye />
                  }
                </i>{" "}
                {showError.password && (
                  <p className={styles.error}>{showError.password}</p>
                )}
                <span></span>
                <label htmlFor="password" className={styles.label}>Password</label>
              </div>
              <div></div>
              <input type="submit" value="Login" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
