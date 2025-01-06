"use client"
import React, { Suspense, useState,useEffect } from "react";
import Loading from "./parts/loading";
import useMobile from "../hooks/useMobile";
// import ToastContainer from "react-toastify";

interface LayoutProps {
  children: React.ReactNode;
}


const Layout: React.FC<LayoutProps>= ({ children }) => {

  const isMobile = useMobile();
  const [zoom, setZoom] = useState(1);
  const mobileSize = 375;

  useEffect(() => {
    const handleZoom = () => {
        const mobileWidth = window.innerWidth;
        const zoomRate = mobileWidth / mobileSize; 
        
        setZoom(isMobile ? zoomRate : 1);
    };

    handleZoom();
    window.addEventListener("resize", handleZoom);

    return window.removeEventListener("resize", handleZoom);
  }, [isMobile])

  return (
    <div style={{ zoom }}>
      <Suspense fallback={<Loading/>}>
        {children}
        {/* <ToastContainer />
        <Loading/> */}
      </Suspense>
    </div>
  )
};

export default Layout;