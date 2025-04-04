"use client"
import React from "react";
import styles from "./stopButton.module.css";
import bgImage from "../../images/stopButton.png";

type Props = {
  isStops: boolean[];
  setIsStops: React.Dispatch<React.SetStateAction<boolean[]>>;
  buttonIndex: number;
  leftPosition: number;
}

const StopButton: React.FC<Props> = ({ isStops, setIsStops, buttonIndex, leftPosition}) => {

  return(
    <div 
      style={{
        left: `${leftPosition}%`,
        backgroundImage: `url(${bgImage.src})`,
      }} 
      className={styles.stopButton}
      onClick={() => {
        if (!isStops[buttonIndex]) {
          const newIsStops = [...isStops];
          newIsStops[buttonIndex] = true;
          setIsStops(newIsStops);
          console.log(newIsStops);
        }
      }}      
    >
      {/* <div style={{
        color: "#FFD700",
        fontSize: "30px",
        fontWeight: "bold",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        STOP
      </div> */}
    </div>
  )
}

export default StopButton;