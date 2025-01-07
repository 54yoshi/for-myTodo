"use client"
import React, { useState, useEffect} from "react";
import styles from "./login.module.css";
import PrimaryButton from "../parts/primaryButton";
import Link from "next/link";

const DefaultPage: React.FC = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [disabled, setDisabled] = useState(true);

useEffect(() => {
  setDisabled(email.length === 0 || password.length === 0);
},[email, password]);

  return (
    <div className={styles.loginContainer}>
        <div className={styles.loginModal}>
          <form className={styles.loginForm}>
            <h1 className={styles.modalTitle}>ログイン</h1>
            <p className={styles.inputLabel}>メールアドレス</p>
            <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <p className={styles.inputLabel}>パスワード</p>
            <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <PrimaryButton text="ログインする" onClick={() => {}}disabled={disabled} style={{marginTop: "15px"}} />
            <Link className={styles.link} href="/admin/signup">
              こちらから新規登録
            </Link>
          </form>
        </div>
    </div>
  ) 
};

export default DefaultPage;