import { useRef, useState } from 'react';

export function useAudio() {
  const audioRef = useRef(null);
  const [musicStarted, setMusicStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const tryStartMusic = () => {
    if (!musicStarted && audioRef.current) {
      audioRef.current.play();
      setMusicStarted(true);
    }
  };

  const toggleAudio = () => {
    if (!musicStarted) return;
    if (isMuted) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsMuted(!isMuted);
  };

  return { audioRef, musicStarted, isMuted, tryStartMusic, toggleAudio };
}
