"use client";

import React, { useRef } from "react";
import etro from "etro";

function Video() {
  const canvasRef = useRef(null);

  const startVideo = async () => {
    const canvas = canvasRef.current;
    canvas.width = 1980;
    canvas.height = 1080;

    const movie = new etro.Movie({ canvas });

    // 🎥 Background video
    const videoLayer = new etro.layer.Video({
      startTime: 0,
      duration: 5,
      source: "intro.mp4",
    });

    // 🖼️ Image layer with animated scale via transform
    const imageLayer = new etro.layer.Image({
      startTime: 0,
      duration: 4,
      source: "zz.jpg",
      x: 700,
      y: 100,
      width: 500,
      height: 500,

      // 💥 Scale animation using transform
      transform: (layer, time) => {
        // Start scale = 1x, gradually grow to 1.8x between 1s and 3s
        let scale = 1;
        if (time >= 1 && time <= 3) {
          const progress = (time - 1) / 2;
          scale = 1 + progress * 0.8;
        } else if (time > 3) {
          scale = 1.8;
        }

        // Return transformation matrix: scaleX, skewX, skewY, scaleY, translateX, translateY
        return [scale, 0, 0, scale, 0, 0];
      },
    });

    // 📝 Text layer with animated position
    const textLayer = new etro.layer.Text({
      startTime: 0,
      duration: 4,
      text: "Hello World",
      color: etro.parseColor("white"),
      font: "50px sans-serif",
      x: 950,
      y: (layer, time) => {
        if (time < 2) return 300;
        if (time >= 2 && time <= 4) {
          const progress = (time - 2) / 2;
          return 300 + progress * 300;
        }
        return 600;
      },
    });

    movie.layers.push(videoLayer, imageLayer, textLayer);

    await movie.play();
    console.log("🎬 Movie finished playing");
  };

  return (
    <div className="flex flex-col gap-10 p-4">
      <button
        className="bg-green-300 text-black text-xl font-bold p-2 rounded-lg"
        onClick={startVideo}
      >
        Start
      </button>

      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "auto",
          background: "#000",
        }}
      />
    </div>
  );
}

export default Video;
