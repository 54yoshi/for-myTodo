import "~/styles/destyle.css";
import React from "react";
import Layout from "../components/Layout";

export default function RootLayout ({
  children
} : Readonly<{
  children: React.ReactNode 
}>){
  return (
    <html lang="ja">
      <head>
      <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
