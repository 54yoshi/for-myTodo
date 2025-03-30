import React,{ useState, useEffect, useRef, useMemo } from "react";
import styles from "./slotSlider.module.css";

type Props = {
  leftPosition: number;
  sliderIndex: number;
  isStops: boolean[];
  slotImages: {id: number, src: string}[];
  isFirstRender: boolean;
}

const SlotSlider: React.FC<Props> = ({ leftPosition, sliderIndex, isStops, slotImages, isFirstRender}) => {
  const [slidePosition, setSlidePosition] = useState(0);
  const rafRef = useRef<number | null>(null);

  const renderRef = useRef(true);
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
      console.log('renderRef.current', renderRef.current);
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
      console.log('containerCenterY', containerCenterY);
  
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
        const closestKey = closestElement.getAttribute("data-key");
        console.log("最も近い画像のkeyは:", closestKey);
      }      
  
      if (closestElement) {
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
  
  function shuffleArray (array) {
    const copyArray = [...array];
    for(let i = copyArray.length - 1; i > 0; --i){
      const j = Math.floor(Math.random() * (i + 1));
      [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
    }
     return copyArray;
  };

  const shuffledSlotImages = useMemo(() => {
    console.log("シャッフルが毎回発生している");
    return shuffleArray(slotImages)
  }, [slotImages]);


  return(
    <div style={{ left: `${leftPosition}%` }} className={styles.container}>
      <div className={styles.cover}>
        <div 
          style={{ 
            transform: `translateY(${slidePosition}px)`
          }} 
          className={styles.sliderContainer}
        >
          <div className={styles.sliderImages} ref={sliderRef}>
            {shuffledSlotImages.map(({id, src}) => (
              <div 
                key={id} 
                className={styles.sliderImgBox}
                data-key={id}
              >
                <img  className={styles.sliderImg} src={src}></img>
              </div>
            ))}
          </div>
          <div className={styles.sliderImages}>
            {shuffledSlotImages.map(({id, src}) => (
              <div 
                key={id} 
                className={styles.sliderImgBox}
                data-key={id}
              >
                <img className={styles.sliderImg} src={src}></img>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default SlotSlider;
