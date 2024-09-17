import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { parseUrlParams, getRandomItem } from '../utils/helpers';
import VideoPlayer from '../components/VideoPlayer';

const videoUrls = [
  'https://example.com/video1.mp4',
  'https://example.com/video2.mp4',
  'https://example.com/video3.mp4',
];

const musicUrls = [
  'https://example.com/music1.mp3',
  'https://example.com/music2.mp3',
  'https://example.com/music3.mp3',
];

const Index = () => {
  const [searchParams] = useSearchParams();
  const [captions, setCaptions] = useState([]);
  const [clipLength, setClipLength] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [selectedMusic, setSelectedMusic] = useState('');
  const [totalPlayTime, setTotalPlayTime] = useState(0);

  useEffect(() => {
    const { captions: parsedCaptions, clipLengthInSeconds } = parseUrlParams(searchParams);
    setCaptions(parsedCaptions);
    setClipLength(clipLengthInSeconds);
    selectRandomMedia();
  }, [searchParams]);

  const selectRandomMedia = () => {
    setSelectedVideo(getRandomItem(videoUrls));
    setSelectedMusic(getRandomItem(musicUrls));
  };

  const handleVideoEnd = () => {
    setTotalPlayTime(prevTime => prevTime + clipLength);
    selectRandomMedia();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      {selectedVideo && selectedMusic ? (
        <VideoPlayer
          videoUrl={selectedVideo}
          audioUrl={selectedMusic}
          captions={captions}
          clipLength={clipLength}
          totalPlayTime={totalPlayTime}
          onVideoEnd={handleVideoEnd}
        />
      ) : (
        <p className="text-center text-white">Loading...</p>
      )}
    </div>
  );
};

export default Index;
