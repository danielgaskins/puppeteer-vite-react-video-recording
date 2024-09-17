import React, { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ videoUrl, captions, clipLength, elapsedTime, onVideoEnd, onVideoStart, startTime, videoStartTime }) => {
  const videoRef = useRef(null);
  const [currentCaption, setCurrentCaption] = useState('');

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      if (!videoStartTime) return;

      const currentTime = (Date.now() - videoStartTime) / 1000; // Calculate time since video started
      const currentCaption = captions.find(
        caption => currentTime >= caption.startTime && currentTime <= caption.endTime
      );
      setCurrentCaption(currentCaption ? currentCaption.words.join(' ') : '');

      if (currentTime >= clipLength / 1000) {
        video.pause();
        onVideoEnd();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', onVideoEnd);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', onVideoEnd);
    };
  }, [captions, clipLength, onVideoEnd, videoStartTime]);

  useEffect(() => {
    const video = videoRef.current;
    video.load();
    video.currentTime = startTime;
    video.play().then(() => {
      onVideoStart(); // Call onVideoStart when the video actually starts playing
    }).catch(error => {
      console.error('Error playing video:', error);
    });
  }, [videoUrl, startTime, onVideoStart]);

  return (
    <div className="relative w-full h-screen">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
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
