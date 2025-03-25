import styles from "./spinButton.module.css";
import bgImage from "../../images/spinButton.png";

import React, { useRef }from "react";

type Props = {
  isStops: boolean[];
  setIsStops: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const SpinButton: React.FC<Props> = ({ isStops, setIsStops }) => {
  const spinRef = useRef(null);

  function spin() {
    const el = spinRef.current;

    el.classList.remove('rotate');
    void el.offsetWidth; 
    el.classList.add('rotate');
  }

  async function checkAllTrue() {
    return isStops.every((stop) => stop);
  };

  return(
    <div 
      ref={spinRef}
      className={styles.spinButton}
      style={{
        backgroundImage: `url(${bgImage.src})`,
      }}
      onClick={checkAllTrue() ? () => {
        const newIsStops = [...isStops];

        newIsStops.forEach((stop) => {
          stop = false; 
        })     
        
        setIsStops(newIsStops);
      } : undefined}
    >
    </div>
  )
}

export default SpinButton;