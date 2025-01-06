import React from "react";

interface LoadingProps {
  isLoading?: boolean;
}

const Loading: React.FC<LoadingProps> = ({isLoading}) => {
  if(!isLoading) return null;
  return (
    <div style={{
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "600",
      fontSize: "40px"
    }}>Loading...</div>)
}

export default Loading;