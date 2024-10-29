import React, { useState } from "react";
import useStateImg from "./images/useState.png";
import useEffectImg from "./images/useEffect.png";
import useMemoImg from "./images/useMemo.png";
import useCallbackImg from "./images/useCallback.png";
import useContextImg from "./images/useContext.png";
import useReducerImg from "./images/useReducer.png";

const images = [
  { src: useStateImg, alt: "useState" },
  { src: useEffectImg, alt: "useEffect" },
  { src: useMemoImg, alt: "useMemo" },
  { src: useCallbackImg, alt: "useCallback" },
  { src: useContextImg, alt: "useContext" },
  { src: useReducerImg, alt: "useReducer" },
];

const Hooks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRightClick = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              margin: "0 10px",
              padding: "10px",
              background: currentIndex === index ? "#007BFF" : "#f0f0f0",
              color: currentIndex === index ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {image.alt}
          </button>
        ))}
      </nav>
      <div style={{ position: "relative", display: "inline-block" }}>
        {currentIndex > 0 && (
          <button
            onClick={handleLeftClick}
            style={{
              position: "absolute",
              left: "5px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              background: "none",
              border: "none",
              fontSize: "24px",
            }}
          >
            &lt;
          </button>
        )}
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          style={{ width: "450px", height: "450px" }}
        />
        {currentIndex < images.length - 1 && (
          <button
            onClick={handleRightClick}
            style={{
              position: "absolute",
              right: "5px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              background: "none",
              border: "none",
              fontSize: "24px",
            }}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default Hooks;
