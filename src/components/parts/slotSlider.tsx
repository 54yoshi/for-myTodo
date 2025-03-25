import React,{ useState, useEffect, useRef } from "react";
import styles from "./slotSlider.module.css";
import slotImage1 from "../../images/slotImage.png";
import slotImage2 from "../../images/slotImage1.png";
import slotImage3 from "../../images/slotImage2.png";
import slotImage4 from "../../images/slotImage3.png";
import slotImage5 from "../../images/slotImage4.png";
import slotImage6 from "../../images/slotImage5.png";

type Props = {
  leftPosition: number;
  sliderIndex: number;
  isStops: boolean[];
}

const SlotSlider: React.FC<Props> = ({ leftPosition, sliderIndex, isStops}) => {
  const [slidePosition, setSlidePosition] = useState(0)
  const rafRef = useRef<number | null>(null);

  const speed = 10;
  
  const animation = () => {
    if(isStops[sliderIndex]){
      setSlidePosition(prev => prev + speed);
      rafRef.current = requestAnimationFrame(animation);
    }
  };
  
  useEffect(() => {
    animation();
  }, [isStops[sliderIndex]]);

  const slotImages = [
    {id: 1, src:slotImage1.src},
    {id: 2, src:slotImage2.src},
    {id: 3, src:slotImage3.src},
    {id: 4, src:slotImage4.src},
    {id: 5, src:slotImage5.src},
    {id: 6, src:slotImage6.src},
  ];

  return(
    <div style={{ left: `${leftPosition}%` }} className={styles.container}>
      <div 
        style={{ 
          transform: slidePosition === 0 ? `translateY(-50%)` : `translateY(${slidePosition}px)`
        }} 
        className={styles.sliderContainer}
      >
        <div className={styles.sliderImages}>
          {slotImages.map(({id, src}) => (
            <div key={id} className={styles.sliderImgBox}>
              <img className={styles.sliderImg} src={src}></img>
            </div>
          ))}
        </div>
        <div className={styles.sliderImages}>
          {slotImages.map(({id, src}) => (
            <div key={id} className={styles.sliderImgBox}>
              <img className={styles.sliderImg} src={src}></img>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default SlotSlider;
