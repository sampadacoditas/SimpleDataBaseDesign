import React from 'react'
import { BiArrowBack } from "react-icons/bi";
import styles from "./BackButton.module.scss"
import { IBackButtonProps } from './BackButton.types';

const BackButton: React.FC<IBackButtonProps> = (props) => {
  return (
    <div className={styles.back} onClick={props.onclickHandle}>
      <BiArrowBack />
    </div>
  )
}

export default BackButton