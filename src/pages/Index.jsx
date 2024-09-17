import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { parseUrlParams, getRandomItem } from '../utils/helpers';
import VideoPlayer from '../components/VideoPlayer';
import VideoPreloader from '../components/VideoPreloader';

const videoUrls = [
  "videos/854695-hd_1920_1080_30fps.mp4",
  "videos/1093662-hd_1920_1080_30fps.mp4", 
  "videos/1409899-uhd_3840_2160_25fps.mp4",
  "videos/1448735-uhd_4096_2160_24fps.mp4",
  "videos/1542008-hd_1920_1080_30fps.mp4",
  "videos/2098989-uhd_3840_2160_30fps.mp4",
  "videos/2330730-uhd_3840_2160_24fps.mp4", 
  "videos/2480792-hd_1920_1080_24fps.mp4",
  "videos/3173312-uhd_3840_2160_30fps.mp4",
  "videos/3214448-uhd_3840_2160_25fps.mp4",
  "videos/3571264-uhd_3840_2160_30fps.mp4", 
  "videos/4062018-hd_1920_1080_30fps.mp4",
  "videos/4125029-uhd_3840_2160_24fps.mp4",
  "videos/4174024-hd_1920_1080_24fps.mp4",
  "videos/4205697-uhd_3840_2160_30fps.mp4",
  "videos/4323945-hd_1920_1080_25fps.mp4",
  "videos/4448895-hd_1080_1920_30fps.mp4",
  "videos/4763824-uhd_3840_2160_24fps.mp4",
  "videos/4763826-uhd_4096_2160_24fps.mp4",
  "videos/4812203-hd_1080_1920_30fps.mp4",
  "videos/4919750-uhd_4096_2160_25fps.mp4",
  "videos/4937376-uhd_2160_3840_24fps.mp4",
  "videos/5147455-hd_1080_1920_30fps.mp4",
  "videos/5562986-uhd_3840_2160_24fps.mp4",
  "videos/5896379-uhd_2160_3840_24fps.mp4",
  "videos/5946371-uhd_3840_2160_30fps.mp4",
  "videos/6010489-uhd_2160_3840_25fps.mp4",
  "videos/6394054-uhd_4096_2048_24fps.mp4",
  "videos/6624888-uhd_2160_3840_30fps.mp4",
  "videos/6981411-hd_1920_1080_25fps.mp4",
  "videos/8538236-uhd_1440_2514_30fps.mp4",
  "videos/8820216-uhd_3840_2160_25fps.mp4",
  "videos/8856785-uhd_2160_3840_25fps.mp4",
  "videos/8859849-uhd_2160_3840_25fps.mp4",
  "videos/8928431-uhd_3840_2160_25fps.mp4",
  "videos/8928582-uhd_3840_2160_25fps.mp4"
];

const Index = () => {
  const [searchParams] = useSearchParams();
  const [captions, setCaptions] = useState([]);
  const [clipLength, setClipLength] = useState(5000);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [nextVideo, setNextVideo] = useState(null);
  const [totalPlayTime, setTotalPlayTime] = useState(0);

  const selectRandomVideoAndTime = useCallback(() => {
    const video = getRandomItem(videoUrls);
    const tempVideo = document.createElement('video');
    tempVideo.src = video;
    return new Promise((resolve) => {
      tempVideo.onloadedmetadata = () => {
        const videoDuration = tempVideo.duration;
        const maxStartTime = Math.max(0, videoDuration - clipLength / 1000);
        const randomStartTime = Math.random() * maxStartTime;
        resolve({ url: video, startTime: randomStartTime });
      };
    });
  }, [clipLength]);

  const preloadNextVideo = useCallback(() => {
    selectRandomVideoAndTime().then(setNextVideo);
  }, [selectRandomVideoAndTime]);

  useEffect(() => {
    const { captions: parsedCaptions, clipLengthInSeconds } = parseUrlParams(searchParams);
    setCaptions(parsedCaptions);
    setClipLength(clipLengthInSeconds * 1000);

    selectRandomVideoAndTime().then((video) => {
      setCurrentVideo(video);
      preloadNextVideo();
    });
  }, [searchParams, selectRandomVideoAndTime, preloadNextVideo]);

  const handleVideoEnd = useCallback(() => {
    setTotalPlayTime(prevTime => prevTime + clipLength);
    setCurrentVideo(nextVideo);
    preloadNextVideo();
  }, [clipLength, nextVideo, preloadNextVideo]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      {currentVideo ? (
        <>
          <VideoPlayer
            videoUrl={currentVideo.url}
            captions={captions}
            clipLength={clipLength}
            totalPlayTime={totalPlayTime}
            onVideoEnd={handleVideoEnd}
            startTime={currentVideo.startTime}
          />
          <VideoPreloader
            src={nextVideo?.url}
            onLoad={() => {}}
          />
        </>
      ) : (
        <p className="text-center text-white">Loading...</p>
      )}
    </div>
  );
};

export default Index;
