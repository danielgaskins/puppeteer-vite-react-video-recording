import React, { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ videoUrl, audioUrl, captions, clipLength, totalPlayTime, onVideoEnd, isPlaying }) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [currentCaption, setCurrentCaption] = useState('');

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      const currentTime = totalPlayTime + video.currentTime;
      const currentCaption = captions.find(
        caption => currentTime >= caption.startTime && currentTime <= caption.endTime
      );
      setCurrentCaption(currentCaption ? currentCaption.words.join(' ') : '');

      if (video.currentTime >= clipLength) {
        video.pause();
        audio.pause();
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
    const audio = audioRef.current;

    video.load();
    audio.load();

    if (isPlaying) {
      video.play().catch(error => console.error('Error playing video:', error));
      audio.play().catch(error => console.error('Error playing audio:', error));
    } else {
      video.pause();
      audio.pause();
    }
  }, [videoUrl, audioUrl, isPlaying]);

  return (
    <div className="relative w-full h-screen">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        muted
      />
      <audio ref={audioRef} src={audioUrl} />
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="text-white text-2xl font-bold bg-black bg-opacity-50 p-4 inline-block rounded">
          {currentCaption}
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
