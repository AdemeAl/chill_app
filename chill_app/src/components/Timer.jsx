import React, { useState, useEffect } from "react";
import useSound from 'use-sound';
import soundFile from './assets/notification.mp3';


function Minuteur() {
  const [duree, setDuree] = useState(0); // Durée initiale du minuteur en secondes
  const [secondes, setSecondes] = useState(duree);
  const [isRunning, setIsRunning] = useState(false);

  const [playNotification] = useSound(soundFile, { volume: 0.5 });
  useEffect(() => {
    if(isRunning == true)
    {
      if (secondes === 0) {
        playNotification(); // Jouer la notification lorsque le temps est écoulé
      }
    }
  }, [secondes, playNotification]);


  // Fonction pour démarrer le minuteur
  const demarrerMinuteur = () => {
    setIsRunning(true);
    
  };

  // Fonction pour arrêter le minuteur
  const arreterMinuteur = () => {
    setIsRunning(false);
  };

  // Fonction pour réinitialiser le minuteur
  const reinitialiserMinuteur = (nouvelleDuree) => {
    setSecondes(nouvelleDuree); // Réinitialiser les secondes avec la durée actuelle
    setIsRunning(false);
  };

  // Effet pour mettre à jour le minuteur chaque seconde
  useEffect(() => {
    let timer;
    if (isRunning && secondes > 0) {
      timer = setInterval(() => {
        setSecondes((prevSecondes) => prevSecondes - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondes]);

  // Conversion des secondes en format "mm:ss"
  const formatMinuteur = (tempsEnSecondes) => {
    const minutes = Math.floor(tempsEnSecondes / 60);
    const secondesRestantes = tempsEnSecondes % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secondesRestantes < 10 ? "0" : ""
    }${secondesRestantes}`;
  };

  return (
    <div className="mt-3 mb-4">
      <h1 className="text-center text-4xl font-serif">
        {formatMinuteur(secondes)}
      </h1>
      <div className="flex justify-center mt-2">
        <button
          className="rounded-lg bg-opacity-60 backdrop-filter backdrop-blur-none bg-zinc-600 p-2 hover:font-bold"
          onClick={() => reinitialiserMinuteur(300)}
        >
          5 min
        </button>
        <button
          className="ml-3 rounded-lg bg-opacity-60 backdrop-filter backdrop-blur-none p-2 bg-zinc-600 hover:font-bold"
          onClick={() => reinitialiserMinuteur(1500)}
        >
          25 min
        </button>
        <button
          className="ml-3 rounded-lg bg-opacity-60 backdrop-filter backdrop-blur-none p-2 bg-zinc-600 hover:font-bold"
          onClick={() => reinitialiserMinuteur(3600)}
        >
          1 h
        </button>
      </div>
      <div className="flex mt-2 justify-center">
        {!isRunning ? (<button onClick={demarrerMinuteur}>
            <i className="fa-solid fa-play hover:scale-110 text-lg"></i>
          </button>) :
          (<button onClick={arreterMinuteur}>
            <i className="fa-solid fa-pause hover:scale-110 text-lg"></i>
          </button>)
        }
        <button onClick={() => reinitialiserMinuteur(duree)}>
          <i className="fa-solid fa-stop ml-4 hover:scale-110 text-lg"></i>
        </button>
      </div>
    </div>
  );
}

export default Minuteur;
