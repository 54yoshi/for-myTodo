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
        borderBottom: "1px solid black",
        width: "100%", 
        height: "80px",
        textAlign: "center"
      }}
      >
        for my web
      </div>
      {children}
    </div>
  )
};

export default Layout;