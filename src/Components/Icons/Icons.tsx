import React, { useState } from 'react'
import styles from "./Icons.module.scss";
import { IIconsProps } from './Icons.types';

const Icons: React.FC<IIconsProps> = (props) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  
  const TIMEOUT = 1000;
  let timer: any = 0;
  
  function onMouserEnterHandler() {
    timer = setTimeout(() => {
      setTooltipVisible(true);
    }, TIMEOUT);
  }

  function onMouseLeaveHandler() {
    clearTimeout(timer);
    setTooltipVisible(false);
  }
  return (
    <div className={styles.icons}
      onDoubleClick={props.navigate}
      onContextMenu={(event) =>{
        clearTimeout(timer);
        setTooltipVisible(false);
        return props.ContextMenu(event);
      }}
      onMouseEnter={onMouserEnterHandler}
      onMouseLeave={onMouseLeaveHandler}>
      {props.type === 'Project' && <img src="https://cdn-icons-png.flaticon.com/512/716/716784.png" alt={props.name} width="auto" height={props.size.split(",")[0]} />}
      {props.type === 'Excercise' && <img src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png" alt={props.name} width="auto" height={props.size.split(",")[0]} />}
      {props.type === "Table" && <img src="https://cdn-icons-png.flaticon.com/512/2535/2535554.png" alt={props.name} width="auto" height={props.size.split(",")[0]} />}
      <p style={{ fontSize: `${props.size.split(",")[1]}px` }} >{props.name}</p>
      <div className={tooltipVisible ? styles.toolTip : styles.displayNone}>
        <p>Name: <span>{props.name}</span></p>
        <p>Type: <span>{props.type}</span></p>
      </div>
    </div>
  )
}

export default Icons