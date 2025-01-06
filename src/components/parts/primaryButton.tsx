import React from "react";
import styles from "./primaryButton.module.css";

interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
  style?: React.CSSProperties;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({  
  text,
  onClick,
  disabled,
  style
}) => {
 return (
    <div className={`${styles.primaryButton} ${disabled ? styles.disabled : ""}`} onClick={disabled ? () => {window.alert("入力されていません")} : onClick} style={ style }
    >
      {text}
    </div>
 )
}

export default PrimaryButton;