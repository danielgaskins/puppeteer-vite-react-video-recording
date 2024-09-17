import React, { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ videoUrl, audioUrl, captions, clipLength, totalPlayTime, onVideoEnd }) => {
  const videoRef = useRef(null);
  const [currentCaption, setCurrentCaption] = useState('');

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      const currentTime = totalPlayTime + video.currentTime;
      const currentCaption = captions.find(
        caption => currentTime >= caption.startTime && currentTime <= caption.endTime
      );
      setCurrentCaption(currentCaption ? currentCaption.words.join(' ') : '');

      if (video.currentTime >= clipLength) {
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
  }, [captions, clipLength, totalPlayTime, onVideoEnd]);

  useEffect(() => {
    const video = videoRef.current;

    video.load();

    const playMedia = () => {
      video.play().catch(error => console.error('Error playing video:', error));
    };

    playMedia();
  }, [videoUrl, audioUrl]);

  return (
    <div className="relative w-full h-screen">
      <video
        ref={videoRef}
        src={videoUrl}
        style={{maxHeight:"100%", maxWidth: "100%"}}
        className="w-full h-full object-cover"
        autoPlay
        muted="muted"
      />
    </div>
  );
};

export default VideoPlayer;
