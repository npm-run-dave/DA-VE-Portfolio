import React from "react";

export default function Success({ message }) {
  return (
    <div
      style={{
        backgroundColor: "#303030",
        color: "white",
        borderRadius: "10px",
        fontSize: "16px",
        padding: "20px",
        maxWidth: "400px",
        margin: "20px auto",
        textAlign: "center",
        border: "2px solid white",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        position: "relative",
        animation: "fadeInScaleUp 1s ease-out",
      }}
    >
      <h3>{message || "Success!"}</h3>

      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          height: "4px",
          backgroundColor: "#1CBFA1",
          animation: "lineAnimation 2s forwards",
        }}
      ></div>

      <style jsx>{`
        @keyframes fadeInScaleUp {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes lineAnimation {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
