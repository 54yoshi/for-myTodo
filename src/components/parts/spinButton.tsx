import styles from "./spinButton.module.css";
import bgImage from "../../images/spinButton.png";

import React, {useRef}from "react";

type Props = {
  isStops: boolean[];
  setIsStops: React.Dispatch<React.SetStateAction<boolean[]>>;
  setSlotResults: React.Dispatch<React.SetStateAction<number[][]>>;
  setReachIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const SpinButton: React.FC<Props> = ({ isStops, setIsStops, setSlotResults, setReachIds }) => {
  const spinRef = useRef(null);

  function spin() {
    const el = spinRef.current;

    el.classList.remove('rotate');
    void el.offsetWidth; 
    el.classList.add('rotate');
  }

  function checkAllTrue(isStops) {
    return isStops.every((stop) => stop);
  };

  return(
    <div 
      ref={spinRef}
      className={styles.spinButton}
      style={{
        backgroundImage: `url(${bgImage.src})`,
        cursor: "pointer",
      }}
      onClick={ () => {
        if(checkAllTrue(isStops)) {
          console.log(isStops);
          const newIsStops = isStops.map(() => false); 
          setIsStops(newIsStops);

          setSlotResults([
            [null, null, null],
            [null, null, null],
            [null, null, null],
          ]);
          setReachIds([]);
        }
      }}
    >
    </div>
  )
}

export default SpinButton;