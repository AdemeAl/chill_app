import { useEffect, useRef, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "./index.css";
import VideoBg1 from "./components/assets/bg2.mp4";
import VideoBg2 from "./components/assets/station.mp4";
import VideoBg3 from "./components/assets/day.mp4";
import VideoBg4 from "./components/assets/night.mp4";
import VideoBg5 from "./components/assets/background.mp4";


import Player from "./components/Player";
import Timer from "./components/Timer";
import RainBtn from "./components/RainBtn";
import Todolist from "./components/Todolist";

function App({ openFullscreen }) {
  const handle = useFullScreenHandle();
  const videoBg = useRef();

  const [bg1, setbg1] = useState(false);
  const [bg2, setbg2] = useState(false);
  const [bg3, setbg3] = useState(false);
  const [bg4, setbg4] = useState(false);
  const [bg5, setbg5] = useState(false);

  useEffect(() => {
    if (bg1) {
      
      videoBg.current.src = VideoBg1;
    }
    if (bg2) {
      videoBg.current.src = VideoBg2;
    }
    if (bg3) {
      videoBg.current.src = VideoBg3;
    }
    if (bg4) {
      videoBg.current.src = VideoBg4;
    }
    if (bg5) {
      videoBg.current.src = VideoBg5;
    }
    
  
    
  }, [bg1, bg2, bg3,bg4, bg5])
  

  return (
    <div>
      <FullScreen handle={handle}>
        <video id="video" ref={videoBg} src={VideoBg4} id="video" loop autoPlay muted className="p-0 m-0 absolute w-full h-full object-cover" ></video>
        <div className="flex flex-col absolute top-8 left-4">
          <Player />
          <Timer />
          <Todolist />
          
          
        </div>
        <div className="flex flex-col absolute bottom-5 right-5">
          <button className="hover:underline" style={{textDecoration : bg1 ?  'underline' : ''}} onClick={setbg1}>Tokyo </button>
          <button className="hover:underline" style={{textDecoration : bg2 ?  'underline' : ''}} onClick={setbg2}>Station</button>
          <button className="hover:underline" style={{textDecoration : bg3 ?  'underline' : ''}} onClick={setbg3}>Day</button>
          <button className="hover:underline" style={{textDecoration : bg4 ?  'underline' : ''}} onClick={setbg4}>Night</button>
          <button className="hover:underline" style={{textDecoration : bg5 ?  'underline' : ''}} onClick={setbg5}>Coffe Work</button>
        </div>
        <button className="absolute top-5 right-5" onClick={handle.enter}>
          <i className="fa-solid fa-expand"></i>
        </button>
        <RainBtn />
      </FullScreen>
    </div>
  );
}

export default App;
