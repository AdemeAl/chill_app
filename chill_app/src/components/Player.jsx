import React from "react";
import { useRef, useState, useEffect } from "react";

import { songData } from "./assets/audio";

function Player({ AudioPlayerProps }) {
  const [songs, setSongs] = useState(songData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songData[0]);
  const audio = useRef();

  useEffect(() => {
    if (isPlaying) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }, [isPlaying, currentSong]);

  const handlePlay = () => {
    const duration = audio.current.duration;
    const ct = audio.current.currentTime;

    setCurrentSong({
      ...currentSong,
      progress: (ct / duration) * 100,
      length: duration,
      currentT: (ct / 60).toFixed(2),
      durationT: (duration / 60).toFixed(2),
    });
  };

  const PlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const SeekBar = useRef();

  const checkWidth = (e) => {
    let width = SeekBar.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const barProgress = (offset / width) * 100;
    audio.current.currentTime = (barProgress / 100) * currentSong.length;
  };
  const [repeat, setRepeat] = useState(false);

  const repeatFunction = () =>{
    audio.current.currentTime = 0;
    audio.current.play();

  }

  const skipBack = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);

    if (index == 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }

    audio.current.currentTime = 0;
    audio.current.play();
    setRepeat(false);
  };
  

  const skipNext = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);

    if (index == songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }

    audio.current.currentTime = 0;
    
    setRepeat(false);
  };

  const [isVolume, setVolume] = useState(true);

  useEffect(() => {
    if (isVolume) {
      audio.current.volume = 1;
    } else {
      audio.current.volume = 0;
    }
  }, [isVolume]);

  // Fonction de gestion du changement de volume
  const handleChangeVolume = () => {
    setVolume(!isVolume);
  };

  const handleDemute = () => {
    setVolume(!isVolume);
  };

  navigator.mediaSession.setActionHandler("pause", () => PlayPause());
  navigator.mediaSession.setActionHandler("play", () => PlayPause());

  navigator.mediaSession.setActionHandler("previoustrack", () => skipBack());
  navigator.mediaSession.setActionHandler("nexttrack", () => skipNext());

  const [volume, setSongVolume] = useState(100);

  useEffect(() => {
    if (isPlaying) {
      audio.current.volume = volume / 100;

    }
  }, [volume]);

  

  
  
  return (
    <div>
      <audio
        src={currentSong.url}
        ref={audio}
        onTimeUpdate={handlePlay}
        onEnded={repeat ? (repeatFunction) : (skipNext)}
      ></audio>
      <div className="flex flex-col justify-center p-3 rounded-lg bg-opacity-60 backdrop-filter backdrop-blur-none bg-zinc-600  w-56 h-52 ml-3">
        <h1 className="text-center text-xl mb-2">{currentSong.title}</h1>
        <div className="flex justify-center text-xl items-center">
          <i
            onClick={skipBack}
            className="fa-solid fa-backward-step  hover:cursor-pointer "
          ></i>
          {isPlaying ? (
            <i
              onClick={PlayPause}
              className="fa-solid fa-pause ml-4  hover:cursor-pointer text-2xl t-1 hover:scale-105"
            ></i>
          ) : (
            <i
              onClick={PlayPause}
              className="fa-solid fa-circle-play ml-4 hover:cursor-pointer text-2xl t-1 hover:scale-105"
            ></i>
          )}
          <i
            onClick={skipNext}
            className="fa-solid fa-forward-step ml-4 hover:cursor-pointer "
          ></i>
        </div>
        <div className="flex items-center mt-2">
          <p className="mr-2">{currentSong.currentT}</p>
          <div
            onClick={checkWidth}
            ref={SeekBar}
            className="w-full flex bg-gray-200 rounded-full h-2 dark:bg-gray-800"
          >
            <div
              className="bg-gray-400 h-2 rounded-full"
              style={{ width: `${currentSong.progress + "%"}` }}
            ></div>
          </div>
          <p className="ml-2">{currentSong.durationT}</p>
        </div>
        <div className="flex justify-around items-center mt-2 pr ml-1-2">
          <input
            type="range"
            className="ml-2"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setSongVolume(e.target.value)}
          />
          {isVolume ? (
            <button onClick={handleChangeVolume}>
              <i className="fa-solid fa-volume-high"></i>
            </button>
          ) : (
            <button onClick={handleDemute}>
              <i className="fa-solid fa-volume-xmark"></i>
            </button>

          )}
          {repeat ? <i onClick={setRepeat} className="fa-solid fa-repeat text-blue-300 hover:cursor-pointer ml-1"></i> : <i onClick={setRepeat} className="fa-solid fa-repeat hover:cursor-pointer ml-1"></i>}
        </div>
      </div>
    </div>
  );
}

export default Player;
