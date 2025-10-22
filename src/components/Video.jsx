"use client";

import React, { useEffect, useRef } from "react";
import etro from "etro";

function Video() {
  const canvasRef = useRef(null);

  const startVideo = () => {
    const canvas = canvasRef.current;

    canvas.width = 1980;
    canvas.height = 1080;

    const movie = new etro.Movie({ canvas });

    const layer = new etro.layer.Video({
      startTime: 0,
      duration: 5,
      source: "intro.mp4",
    });

    const Imagelayer = new etro.layer.Image({
        startTime:0,
        duration:4,
        source:"zz.jpg",
        x:550,
        y:20
    })

    const Textlayer = new etro.layer.Text({
        startTime:0,
        duration:4,
        text: "Hello World",
        color: etro.parseColor("black"),
        font: "50px sans-serif",
        x:950,
        y:300
    })

    movie.layers.push(layer,Imagelayer,Textlayer);

    movie.play().then(() => {
      console.log("Movie finished playing");
    });
  };

  return (
    <div className="flex flex-col gap-10 p-4">
      <button className="bg-green-300 text-black text-xl font-bold p-2 rounded-lg" onClick={startVideo}>start</button>
      {/* Set both actual canvas size and optional style */}
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
