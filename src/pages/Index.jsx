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

  useEffect(() => {
    const { captions: parsedCaptions, clipLengthInSeconds } = parseUrlParams(searchParams);
    setCaptions(parsedCaptions);
    setClipLength(clipLengthInSeconds);
    setSelectedVideo(getRandomItem(videoUrls));
    setSelectedMusic(getRandomItem(musicUrls));
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Video Player App</h1>
        {selectedVideo && selectedMusic ? (
          <VideoPlayer
            videoUrl={selectedVideo}
            audioUrl={selectedMusic}
            captions={captions}
            clipLength={clipLength}
          />
        ) : (
          <p className="text-center text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Index;
