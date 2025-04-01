"use client"
import React ,{ useState, useEffect, useMemo } from "react";
import styles from "./SlotGame.module.css";
import bgImage from "../../images/slotDefaultImage.png";
import SlotRoleInput from "../parts/SlotRoleInput";
import SlotSlider from "../parts/slotSlider";
import StopButton from "../parts/stopButton";
import SpinButton from "../parts/spinButton";
import Bingo from "../parts/Bingo";
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
  type RoleInput = {
    id: number;
    src: string;
    role: string;
  };

  //ユーザーがスライダーの役に入れた情報を管理するためのstate
  const  [roleInputs, setRoleInputs] = useState<RoleInput[]>([
    { id: 1, src: slotImage1.src, role: "" },
    { id: 2, src: slotImage2.src, role: "" },
    { id: 3, src: slotImage3.src, role: "" },
    { id: 4, src: slotImage4.src, role: "" },
    { id: 5, src: slotImage5.src, role: "" },
    { id: 6, src: slotImage6.src, role: "" },
    { id: 7, src: slotImage7.src, role: "" },
    { id: 8, src: slotImage8.src, role: "" },
    { id: 9, src: slotImage9.src, role: "" },
  ]);
  
  //スライダー用のstate(レンダリングを防ぐため)
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

  //リーチと当たり判定をするための配列
  const [slotResults, setSlotResults] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  

  const [isStops , setIsStops] = useState([true, true, true]);

  const [isFirstRender, setIsFirstRender] = useState(true);

  const [reachIds, setReachIds] = useState([]);

  const [isBingoId, setIsBingoId] = useState<number | null>(null);

  useEffect(() => {
    setIsFirstRender(false);
  }, [])
  
  useEffect(() => {
    if(isFirstRender || !isStops.every(stop => stop === true)){
      return;
    }
    const isBingo = isLineUniform(slotResults);
    setIsBingoId(isBingo);
    console.log(isBingo);
  },[isStops[0],isStops[1],isStops[2], slotResults]);

  function isLineUniform(slotResults) {
    if (slotResults.length < 3 || slotResults[0].length < 3) return false;
  
    const size = 3;
  
    // 横方向チェック
    for (let row = 0; row < size; row++) {
      const firstValue = slotResults[0][row];
      if (slotResults.every(col => col[row] === firstValue)) {
        return firstValue;
      }
    }
  
    // 斜め方向チェック（左上→右下）
    const firstDiag1 = slotResults[0][0];
    let isDiag1Uniform = true;
    for (let i = 1; i < size; i++) {
      if (slotResults[i][i] !== firstDiag1) {
        isDiag1Uniform = false;
        break;
      }
    }
    if (isDiag1Uniform) return firstDiag1;
  
    // 斜め方向チェック（左下→右上）
    const firstDiag2 = slotResults[0][size - 1];
    let isDiag2Uniform = true;
    for (let i = 1; i < size; i++) {
      if (slotResults[i][size - 1 - i] !== firstDiag2) {
        isDiag2Uniform = false;
        break;
      }
    }
    if (isDiag2Uniform) return firstDiag2;
  
    return null;
  }

  // スライダーコンポーネントを配置する際の左端からの距離
  const sliderPosition = [
    18,
    36.5,
    55,
  ];

  //ストップボタンを配置する際の
  const stopButtonPosition = [
    8,
    41.5,
    75.5,
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
              slotImages={slotImages}
              isFirstRender={isFirstRender}
              slotResults={slotResults}
              setSlotResults={setSlotResults}
              reachIds={reachIds}
              setReachIds={setReachIds}
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
        <div style={{
          position: "absolute", 
          top: "640px", 
          left: "1080px", 
          width: "28%", 
          height: "13%",
          backgroundColor: "#d1cece",
        }}>
        </div>
          <SlotRoleInput 
            roleInputs={roleInputs} 
            position={1100}
            setRoleInputs={setRoleInputs}
          />
        <SpinButton 
          isStops={isStops}
          setIsStops={setIsStops}
          setSlotResults={setSlotResults}
          setReachIds={setReachIds}
        />
        </div>
        {isBingoId !== null && 
          <Bingo 
            setIsBingoId={setIsBingoId}
            isBingoId={isBingoId}
            roleInputs={roleInputs}
          />
        }
      </div>
  )
}

export default SlotGame;