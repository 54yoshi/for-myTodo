import React,{ useState, useEffect, useRef } from "react";
import styles from "./slotSlider.module.css";

type Props = {
  leftPosition: number;
  sliderIndex: number;
  isStops: boolean[];
  slotImages: {id: number, src: string}[];
  isFirstRender: boolean;
  slotResults: number[][];
  setSlotResults: React.Dispatch<React.SetStateAction<number[][]>>
  reachIds: number[];
  setReachIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const SlotSlider: React.FC<Props> = ({ leftPosition, sliderIndex, isStops, slotImages, isFirstRender, slotResults, setSlotResults, reachIds, setReachIds}) => {
  const [slidePosition, setSlidePosition] = useState(0);
  const [shuffledSlotImages, setShuffledSlotImages] = useState(slotImages);
  const rafRef = useRef<number | null>(null);

  const sliderRef = useRef(null);

  const speed = 30;
  const maxScroll = 0;

  useEffect(() => {
    const sliderHeight = sliderRef.current?.clientHeight;
    if(sliderHeight) {
      setSlidePosition(-sliderHeight); 
    }
  }, []); 
  
  const animation = () => {
    if(!isStops[sliderIndex]){
      const sliderHeight = sliderRef.current?.clientHeight;
      setSlidePosition((prev) => {
        const newPosi = prev + speed;
        if (newPosi >= maxScroll) {
          return -sliderHeight;
        }
        return newPosi;
      });

      rafRef.current = requestAnimationFrame(animation);
    } else {
      if(rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }
  };
  
  useEffect(() => {
    if(isFirstRender){
      return;
    }
    if (isStops[sliderIndex]) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
  
      const sliderImageBoxes = sliderRef.current.querySelectorAll(`.${styles.sliderImgBox}`);
      const containerRect = sliderRef.current.parentElement.parentElement.getBoundingClientRect();
  
      const containerCenterY =  containerRect.top + containerRect.height / 2;
  
      let closestDistance = Infinity;
      let closestElement = null;
  
      sliderImageBoxes.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const imageCenterY = rect.top + rect.height / 2;
        const distance = Math.abs(containerCenterY - imageCenterY);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestElement = el;
        }
      });
  
      if (closestElement) {
        const closestKey = Number(closestElement.getAttribute("data-id"));
        const activeSlider = getActiveSlider(shuffledSlotImages, closestKey);
        const newSlotResults = [...slotResults];
        newSlotResults[sliderIndex] = activeSlider;
        setSlotResults(newSlotResults);

        const closestRect = closestElement.getBoundingClientRect();
        const offset = containerCenterY - (closestRect.top + closestRect.height / 2);
  
        setSlidePosition((prev) => prev + offset);
  
        sliderRef.current.parentElement.style.transition = 'transform 0.9s ease-out';
        sliderRef.current.parentElement.style.transform = `translateY(${slidePosition + offset}px)`;
  
        setTimeout(() => {
          sliderRef.current.parentElement.style.transition = '';
        }, 900);
      }
    } else {
      rafRef.current = requestAnimationFrame(animation);
    }
  
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isStops[sliderIndex]]);

  type SlotImage = {id: number, src: string};

  function getActiveSlider(array: SlotImage[], key: number):number[]{
    const activeIndex = array.findIndex(item => item.id === key);
    const length = array.length;

    if (activeIndex === -1) {
      throw new Error("指定されたkeyが配列に存在しません");
    }
    return [
      activeIndex === 0 ? array[length - 1].id : array[activeIndex - 1].id,
      array[activeIndex].id,
      activeIndex === length - 1 ? array[0].id : array[activeIndex + 1].id,
    ];    
  };
  
  
  function shuffleArray (array) {
    const copyArray = [...array];
    for(let i = copyArray.length - 1; i > 0; --i){
      const j = Math.floor(Math.random() * (i + 1));
      [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
    }
     return copyArray;
  };

  function getReachIds(line) {
    if(line[0] === line[1]){
      return line[0];
    }
    if(line[1] === line[2]){
      return line[1];
    }
    if(line[0] === line[2]){
      return line[0];
    }
  };
  
  
  // 全ラインのリーチ判定とID取得
  function checkReach(results) {
    let reaches = [];
  
    // 横ライン
    for (let row = 0; row < 3; row++) {
      const line = [results[0][row], results[1][row], results[2][row]];
      const reachIds = getReachIds(line);
      if (reachIds !== undefined) { 
        reaches.push(reachIds);
      }
    }
  
    // 斜めライン（左上から右下）
    const diag1 = [results[0][0], results[1][1], results[2][2]];
    const reachIdsDiag1 = getReachIds(diag1);
    if (reachIdsDiag1 !== undefined) {
      reaches.push(reachIdsDiag1);
    }
  
    // 斜めライン（左下から右上）
    const diag2 = [results[0][2], results[1][1], results[2][0]];
    const reachIdsDiag2 = getReachIds(diag2);
    if (reachIdsDiag2 !== undefined) {
      reaches.push(reachIdsDiag2);
    }
  
    return reaches;
  }
  
  
  useEffect(() => {
    if(isFirstRender || isStops.every(stop => stop === true)){
      return;
    }
    const reaches = checkReach(slotResults);
    setReachIds(reaches);
  },[isStops[sliderIndex], slotResults]);

  useEffect(() => {
    setShuffledSlotImages(shuffleArray(slotImages));
  }, []);

  

  return(
    <div style={{ left: `${leftPosition}%` }} className={styles.container}>
      <div className={styles.cover}>
      </div>
        <div 
          style={{ 
            transform: `translateY(${slidePosition}px)`
          }} 
          className={styles.sliderContainer}
        >
        <div className={styles.sliderImages} ref={sliderRef}>
          {shuffledSlotImages.map(({id, src}, index) => (
            <div 
              key={index} 
              className={`${styles.sliderImgBox} ${reachIds.includes(id) ? styles.reach : ''}`}
              data-id={id}
            >
              <img  className={styles.sliderImg} src={src}></img>
            </div>
          ))}
        </div>
        <div className={styles.sliderImages}>
          {shuffledSlotImages.map(({id, src}, index) => (
            <div 
              key={index} 
              className={`${styles.sliderImgBox} ${reachIds.includes(id) ? styles.reach : ''}`}
              data-id={id}
            >
              <img className={styles.sliderImg} src={src}></img>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default SlotSlider;
