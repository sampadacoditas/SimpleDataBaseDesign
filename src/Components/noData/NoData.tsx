import React from 'react';
import styles from  "./NoData.module.scss";

const NoData:React.FC = () => {
  return (
    <div className={styles.notFound}>
      <h1>NO DATA FOUND!!</h1>
    </div>
  )
}

export default NoData