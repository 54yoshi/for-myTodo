"use client"
import React ,{ useState } from "react";
import styles from "./SlotGame.module.css";
import bgImage from "../../images/slotDefaultImage.png";
import SlotSlider from "../parts/slotSlider";
import StopButton from "../parts/stopButton";
import SpinButton from "../parts/spinButton";

const SlotGame: React.FC = () => {
  const [isStops , setIsStops] = useState([true, true, true]);

  // 同じコンポーネントを配置する際の左端からの距離
  const sliderPosition = [
    18,
    36.5,
    55,
  ];

  const stopButtonPosition = [
    18,
    36.5,
    55,
  ];

  return (
      <div className ={styles.container}>
        <div       
          style={{
            position: "relative",
            minHeight: "1000px",
            minWidth: "1500px",
            backgroundImage: `url(${bgImage.src})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        }}>
        {sliderPosition.map((position, index) => {
          return(
            <SlotSlider 
              key={index}
              isStops={isStops}
              leftPosition={position} 
              sliderIndex={index}
            />
          )
        })}
        <div style={{
          position: "absolute", 
          top: "740px", 
          left: "16%", 
          width: "55%", 
          height: "12%",
          backgroundColor: "#d1cece",
        }}>
          {stopButtonPosition.map((position, index) => {
            return(
              <StopButton 
                key={index}
                leftPosition={position} 
                isStops={isStops} 
                setIsStops={setIsStops} 
                buttonIndex={index}
              />
            )
          })}
        </div>
        <SpinButton 
          isStops={isStops}
          setIsStops={setIsStops}
        />
        </div>
      </div>
  )
}

export default SlotGame;