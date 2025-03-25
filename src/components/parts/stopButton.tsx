"use client"
import React, { useState, useEffect } from "react";
// import styles from "./stopButton.module.css";

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
        backgroundColor: isStops[buttonIndex] ? "black" : "blue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position:"absolute",
        top: "759px",
        left: `${leftPosition}%`,
        width: "14%",
        height: "9%",
        cursor: "pointer",
        opacity: "0.8",
      }} 
      onClick={ !isStops[buttonIndex] ? () => {
        const newIsStops = [...isStops];
        newIsStops[buttonIndex] = true;
        
        setIsStops(newIsStops);
      } : undefined}
    >
      <div style={{
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
      </div>
    </div>
  )
}

export default StopButton;