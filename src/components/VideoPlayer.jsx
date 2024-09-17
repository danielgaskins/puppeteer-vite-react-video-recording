import React, { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ videoUrl, captions, clipLength, totalPlayTime, onVideoEnd, startTime }) => {
  const videoRef = useRef(null);
  const [currentCaption, setCurrentCaption] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      const currentTime = totalPlayTime + (video.currentTime - startTime) * 1000;
      const currentCaption = captions.find(
        caption => (currentTime/1000) >= caption.startTime && (currentTime/1000) <= caption.endTime
      );
      setCurrentCaption(currentCaption ? currentCaption.words.join(' ') : '');

      if (video.currentTime - startTime >= clipLength / 1000) {
        video.pause();
        onVideoEnd();
      }
    };

    const handleEnded = () => {
      onVideoEnd();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [captions, clipLength, totalPlayTime, onVideoEnd, startTime]);

  useEffect(() => {
    const video = videoRef.current;
    video.load();
    video.currentTime = startTime;

    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing video:', error);
        // Retry playing after a short delay
        setTimeout(playVideo, 100);
      }
    };

    playVideo();

    return () => {
      video.pause();
      setIsPlaying(false);
    };
  }, [videoUrl, startTime]);

  return (
    <div className="relative w-full h-screen">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        muted
      />
      {isPlaying && (
        <div className="absolute bottom-10 left-0 right-0 text-center">
          <p className="text-white text-2xl bg-black bg-opacity-50 p-2 inline-block">
            {currentCaption}
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
