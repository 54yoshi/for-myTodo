"use client";
import React, { useState, useEffect} from "react";
import styles from "./signup.module.css";
import PrimaryButton from "../parts/primaryButton";
import axios from "axios";


const Signup: React.FC = () => {

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newUserName, setNewUserName] = useState("未登録")

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(newEmail.length === 0 || newPassword.length === 0);
  }, [newEmail, newPassword])

  async function sendEmail(){
    console.log('ok');
    try{
      axios.post(`${process.env.REACT_APP_API_URL}user/verify`, {
        userName: newUserName,
        mailAddress: newEmail,
        password: newPassword,
      });
      console.log('メール送信完了');
      // 送信完了通達用のモーダルのコンポーネントを開くためのコードをここに書く
    } catch(error) {
      console.log(error);
    }
  };

  return(
    <div className={styles.signupContainer}>
      <div className={styles.signupModal}>
        <form className={styles.signupForm}>
          <h1 className={styles.signupTitle}>アカウント作成</h1>
          <p className={styles.inputLabel}>メールアドレス</p>
          <input  className={styles.input} type="email" value={newEmail} onChange={(e) => {setNewEmail(e.target.value);}}/>
          <p className={styles.inputLabel}>パスワード</p>
          <input className={styles.input} type="password" value={newPassword} onChange={(e) => {
            setNewPassword(e.target.value);
          }}/>
          <PrimaryButton text="登録する" disabled={disabled} style={{marginTop: "15px"}} onClick={sendEmail} />
        </form>
      </div>
    </div>
  )
};

export default Signup;