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
      {`ビンゴ${roleInputs[isBingoId].role}`}
      </div>
    </div>
  )
}

export default Bingo;