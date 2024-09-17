import React, { useEffect, useRef } from 'react';

const VideoPreloader = ({ src, onLoad }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlayThrough = () => {
        onLoad(video);
      };
      video.addEventListener('canplaythrough', handleCanPlayThrough);
      return () => {
        video.removeEventListener('canplaythrough', handleCanPlayThrough);
      };
    }
  }, [src, onLoad]);

  return <video ref={videoRef} src={src} preload="auto" style={{ display: 'none' }} />;
};

export default VideoPreloader;