"use client"
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps>= ({ children }) => {
  return(
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{
          position: "absolute", 
          top: "0", 
          left:"0",
          fontWeight: "600",
          fontSize: "20px",
          borderBottom: "2px solid black",
          width: "100%", 
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
      }}>
        for my web
      </div>
      <div style={{height: "80px", width: "100%"}}>
      </div>
      {children}
    </div>
  )
};

export default Layout;