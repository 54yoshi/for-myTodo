import React from "react";
import styles from "./signup.module.css";

const Signup: React.FC = () => {
  return(
    <div>
      <div>
        <h1>アカウント作成</h1>
        <input  className={styles.input} type="text" />
        <input className="" type="text" />
      </div>
    </div>
  )
};

export default Signup;