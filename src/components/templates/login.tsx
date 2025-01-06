"use client"
import React, { useState } from "react";
import styles from "./login.module.css";
import PrimaryButton from "../parts/primaryButton";
import Link from "next/link";

const DefaultPage: React.FC = () => {
const [email, setEmail] = useState("");
const [passward, setPassward] = useState("");
const [disabled, setDisabled] = useState(false);

  return (
    <div className={styles.loginContainer}>
        <div className={styles.loginModal}>
          <div className={styles.loginForm}>
            <h1 className={styles.modalTitle}>ログイン</h1>
            <input className={styles.input} type="text" placeholder="メールアドレス" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input className={styles.input} type="text" placeholder="パスワード" value={passward} onChange={(e) => setPassward(e.target.value)}/>
            <PrimaryButton text="ログインする" onClick={() => {}} disabled />
            <div className={styles.signup}>
              <p>こちらから</p>
              <Link className={styles.signupLink}href="/admin/signup">
                <p>新規登録</p>
              </Link>
            </div>
          </div>
        </div>
    </div>
  ) 
};

export default DefaultPage;