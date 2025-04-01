import React from "react";
import styles from "./Bingo.module.css";
type RoleInput = {
  id: number;
  src: string;
  role: string;
};

type Props = {
  setIsBingoId: React.Dispatch<React.SetStateAction<number>>;
  isBingoId: number;
  roleInputs: RoleInput[];
}

const Bingo = ({setIsBingoId, isBingoId, roleInputs}) => {
  return(
    <div className={styles.container} onClick={() => setIsBingoId(null)}>
      <div className={styles.bingo}>
        <div className={styles.congratulations}>
          <div>
            <div className={styles.party}>🥳</div>
            <div className={styles.party}>🥳</div>
            <div className={styles.party}>🥳</div>
          </div>
          <div className={styles.congratulationsContainer}>
            <div>congratulations!!!</div>
            <div>{`${roleInputs[isBingoId].role}`}</div>
          </div>
          <div>
            <div className={styles.party}>🥳</div>
            <div className={styles.party}>🥳</div>
            <div className={styles.party}>🥳</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bingo;