import React, { useState } from "react";
import styles from "./SlotRoleInput.module.css";

type Props ={
  roleInputs: {id: number, src: string, role: string}[],
  setRoleInputs: React.Dispatch<React.SetStateAction<{id: number, src: string, role: string}[]>>,
  position: number,
}

const SlotRoleInput: React.FC<Props> = ({ 
  roleInputs, 
  setRoleInputs, 
  position 
}) => {
  function updateRoleInputs(id, newRole){
    setRoleInputs((prevContents) => {
      return prevContents.map((prev) => {
        return prev.id === id ? {...prev, role: newRole} : prev;
      });
    });
  }

  return(
      <div 
        className={styles.container}
        style={{ left: `${position}px`}}
      >
        <div className={styles.cover}>
        </div>
        {roleInputs.map(({id, src, role}) => (
          <div 
            key={id}
            className={styles.inputContainer}
          >
            <img 
              src={src} 
              alt="スロットの出目の画像"  
              className={styles.image}
            />
            <div className={styles.textContainer}>
              <input 
                type="text" 
                onChange={e => updateRoleInputs(id, e.target.value)} 
                value={role}
                className={styles.text}
              />
            </div>
          </div>
        ))}
      </div>
  )
}

export default SlotRoleInput;