import React, { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ videoUrl, captions, clipLength, elapsedTime, onVideoEnd, startTime, onFirstPlay, timeZero }) => {
  const videoRef = useRef(null);
  const [currentCaption, setCurrentCaption] = useState('');

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      if (timeZero === null) return;

      const currentTime = (Date.now() - timeZero)/1000;
      const currentCaption = captions.find(
        caption => currentTime >= caption.startTime && currentTime <= caption.endTime
      );
      setCurrentCaption(currentCaption ? currentCaption.words.join(' ') : '');

      if ((video.currentTime - startTime >= clipLength / 1000) || ((video.currentTime - startTime) < -0.5)) {
        video.pause();
        onVideoEnd();
      }
    };

    const handlePlay = () => {
      if (timeZero === null) {
        onFirstPlay(Date.now());
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', onVideoEnd);
    video.addEventListener('play', handlePlay);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', onVideoEnd);
      video.removeEventListener('play', handlePlay);
    };
  }, [captions, clipLength, elapsedTime, onVideoEnd, startTime, onFirstPlay, timeZero]);

  useEffect(() => {
    const video = videoRef.current;
    video.load();
    video.currentTime = startTime;
  }, [videoUrl, startTime]);

  return (
    <div className="relative w-full h-screen">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        autoPlay
        muted
      />
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="text-white text-2xl bg-black bg-opacity-50 p-2 inline-block">
          {currentCaption}
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
