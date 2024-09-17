import React, { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ currentVideoUrl, nextVideoUrl, captions, clipLength, elapsedTime, onVideoEnd, startTime }) => {
  const currentVideoRef = useRef(null);
  const nextVideoRef = useRef(null);
  const [currentCaption, setCurrentCaption] = useState('');

  useEffect(() => {
    const currentVideo = currentVideoRef.current;
    const nextVideo = nextVideoRef.current;

    const handleTimeUpdate = () => {
      const currentTime = elapsedTime;
      const currentCaption = captions.find(
        caption => currentTime >= caption.startTime && currentTime <= caption.endTime
      );
      setCurrentCaption(currentCaption ? currentCaption.words.join(' ') : '');

      if (elapsedTime >= clipLength / 1000) {
        currentVideo.pause();
        onVideoEnd();
      }
    };

    currentVideo.addEventListener('timeupdate', handleTimeUpdate);
    currentVideo.addEventListener('ended', onVideoEnd);

    // Preload the next video
    nextVideo.src = nextVideoUrl;
    nextVideo.load();

    return () => {
      currentVideo.removeEventListener('timeupdate', handleTimeUpdate);
      currentVideo.removeEventListener('ended', onVideoEnd);
    };
  }, [captions, clipLength, elapsedTime, onVideoEnd, nextVideoUrl]);

  useEffect(() => {
    const currentVideo = currentVideoRef.current;
    currentVideo.load();
    currentVideo.currentTime = startTime;
    currentVideo.play().catch(error => console.error('Error playing video:', error));
  }, [currentVideoUrl, startTime]);

  return (
    <div className="relative w-full h-screen">
      <video
        ref={currentVideoRef}
        src={currentVideoUrl}
        className="w-full h-full object-cover"
        muted
      />
      <video
        ref={nextVideoRef}
        className="hidden"
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
