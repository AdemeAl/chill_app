import React, { useEffect, useRef, useState } from "react";
import Rain from "./assets/rain.mp3";

function RainBtn() {
  const rainAudio = useRef();

  const [isRaining, setRain] = useState(false);
  const [rainVolume, setRainVolume] = useState(30);
  useEffect(() => {
    if (isRaining) {
      rainAudio.current.play();
      rainAudio.current.volume = rainVolume / 100;
    } else {
      rainAudio.current.pause();
    }
  }, [isRaining, rainVolume]);

  const playRain = () => {
    setRain(!isRaining);
  };

  return (
    <div className="absolute top-16 right-4">
      <audio src={Rain} ref={rainAudio} loop></audio>
      <div className="flex flex-col justify-center items-center">
        <i
          onClick={playRain}
          className="fa-solid fa-cloud-rain text-lg hover:cursor-pointer hover:scale-110"
          style={{ color: isRaining ? "#86c9eb" : "white" }}
        ></i>
        {isRaining ? <input
          className=" h-2 w-10 mt-6  "
          type="range"
          min={0}
          max={100}
          value={rainVolume}
          orient="vertical" 
          onChange={(e) => setRainVolume(e.target.value)}
          />
          : <></>
        }

      </div>
    </div>
  );
}

export default RainBtn;
