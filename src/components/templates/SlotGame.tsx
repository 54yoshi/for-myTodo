"use client"
import React ,{ useState, useEffect, useMemo } from "react";
import styles from "./SlotGame.module.css";
import bgImage from "../../images/slotDefaultImage.png";
import SlotSlider from "../parts/slotSlider";
import StopButton from "../parts/stopButton";
import SpinButton from "../parts/spinButton";
import slotImage1 from "../../images/slotImage.png";
import slotImage2 from "../../images/slotImage1.png";
import slotImage3 from "../../images/slotImage2.png";
import slotImage4 from "../../images/slotImage3.png";
import slotImage5 from "../../images/slotImage4.png";
import slotImage6 from "../../images/slotImage5.png";
import slotImage7 from "../../images/slotImage6.png";
import slotImage8 from "../../images/slotImage7.png";
import slotImage9 from "../../images/slotImage8.png";


const SlotGame: React.FC = () => {
  const [isStops , setIsStops] = useState([true, true, true]);

  const [isFirstRender, setIsFirstRender] = useState(true);


  useEffect(() => {
    setIsFirstRender(false);
  }, [])

  // 同じコンポーネントを配置する際の左端からの距離
  const sliderPosition = [
    18,
    36.5,
    55,
  ];

  const stopButtonPosition = [
    8,
    41.5,
    75.5,
  ];

  const slotImages = useMemo(() => [
    {id: 1, src:slotImage1.src},
    {id: 2, src:slotImage2.src},
    {id: 3, src:slotImage3.src},
    {id: 4, src:slotImage4.src},
    {id: 5, src:slotImage5.src},
    {id: 6, src:slotImage6.src},
    {id: 7, src:slotImage7.src},
    {id: 8, src:slotImage8.src},
    {id: 9, src:slotImage9.src},
  ], []);    
  

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
              slotImages={slotImages}
              isFirstRender={isFirstRender}
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