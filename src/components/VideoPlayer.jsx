import React, { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ videoUrl, audioUrl, captions, clipLength }) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [currentCaption, setCurrentCaption] = useState('');

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const currentCaption = captions.find(
        caption => currentTime >= caption.startTime && currentTime <= caption.endTime
      );
      setCurrentCaption(currentCaption ? currentCaption.words.join(' ') : '');

      if (currentTime >= clipLength) {
        video.pause();
        audio.pause();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [captions, clipLength]);

  const handlePlay = () => {
    videoRef.current.play();
    audioRef.current.play();
  };

  const handlePause = () => {
    videoRef.current.pause();
    audioRef.current.pause();
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full rounded-lg shadow-md"
          controls
        />
        <audio ref={audioRef} src={audioUrl} />
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handlePlay}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Play
        </button>
        <button
          onClick={handlePause}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Pause
        </button>
      </div>
      <div className="text-center text-xl font-semibold">{currentCaption}</div>
    </div>
  );
};

export default VideoPlayer;