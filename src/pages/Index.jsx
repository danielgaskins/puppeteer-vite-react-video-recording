import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { parseUrlParams, getRandomItem } from '../utils/helpers';
import VideoPlayer from '../components/VideoPlayer';

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

const musicUrls = [
 "music/mixkit-1980-290", 
 "music/mixkit-ambient-251", 
 "music/mixkit-angel-on-earth-865", 
 "music/mixkit-discover-587", 
 "music/mixkit-dont-leave-me-tonight-1058", 
 "music/mixkit-dreaming-of-you-952", 
 "music/mixkit-feedback-dreams-588", 
 "music/mixkit-finding-myself-993", 
 "music/mixkit-forest-treasure-138", 
 "music/mixkit-harp-relax-669", 
 "music/mixkit-kodama-night-town-114", 
 "music/mixkit-loving-you-is-easy-1006", 
 "music/mixkit-meditation-441", 
 "music/mixkit-my-little-star-1037", 
 "music/mixkit-nature-meditation-345", 
 "music/mixkit-nature-yoga-442", 
 "music/mixkit-recline-and-chill-25", 
 "music/mixkit-relax-658", 
 "music/mixkit-relaxation-02-746", 
 "music/mixkit-relaxation-03-747", 
 "music/mixkit-relaxation-05-749", 
 "music/mixkit-relaxation-06-748", 
 "music/mixkit-relaxation-meditation-365", 
 "music/mixkit-relax-beat-292", 
 "music/mixkit-rest-now-584", 
 "music/mixkit-serene-view-443", 
 "music/mixkit-slow-rain-122", 
 "music/mixkit-smooth-meditation-324", 
 "music/mixkit-sonor-07-585", 
 "music/mixkit-spirit-in-the-woods-2-147", 
 "music/mixkit-spirit-in-the-woods-139", 
 "music/mixkit-spiritual-moment-525", 
 "music/mixkit-staring-at-the-night-sky-168", 
 "music/mixkit-transcending-347", 
 "music/mixkit-unforgiven-890", 
 "music/mixkit-valley-sunset-127", 
 "music/mixkit-voxscape-571", 
 "music/mixkit-yoga-music-04-386", 
 "music/mixkit-yoga-song-444", 
 "music/mixkit-yoga-tune-325.mp3"
];

const Index = () => {
  const [searchParams] = useSearchParams();
  const [captions, setCaptions] = useState([]);
  const [clipLength, setClipLength] = useState(5);
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
