import React, { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ videoUrl, captions, clipLength, totalPlayTime, onVideoEnd, startTime }) => {
  const videoRef = useRef(null);
  const [currentCaption, setCurrentCaption] = useState('');

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      console.log(totalPlayTime)
      const currentTime = totalPlayTime + (video.currentTime -startTime) * 1000;
      const currentCaption = captions.find(
        caption => (currentTime/1000) >= caption.startTime && (currentTime/1000) <= caption.endTime
      );
      setCurrentCaption(currentCaption ? currentCaption.words.join(' ') : '');

      if ((startTime-video.currentTime) * 1000 >= clipLength) {
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
    video.currentTime = startTime;
    video.play().catch(error => console.error('Error playing video:', error));
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
