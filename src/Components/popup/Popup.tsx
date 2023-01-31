import { Outlet } from 'react-router-dom';
import { IPopupProps } from './Popup.types';
import styles from "./Popup.module.scss";
import InfoIcon from '@mui/icons-material/Info';

const Popup = ({ status, message }: IPopupProps) => {
  return (
    <div className={styles.popupContainer} >
      <div className={styles[status]}>
        <div className={styles.text}>
          <InfoIcon />
          <span>&nbsp;&nbsp;{message}</span>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Popup