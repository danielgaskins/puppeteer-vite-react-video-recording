export const parseUrlParams = (searchParams) => {
  const captionsParam = searchParams.get('captions');
  const clipLengthParam = searchParams.get('clipLengthInSeconds');

  let captions = [];
  if (captionsParam) {
    try {
      captions = JSON.parse(decodeURIComponent(captionsParam));
    } catch (error) {
      console.error('Error parsing captions:', error);
    }
  }

  const clipLengthInSeconds = clipLengthParam ? parseInt(clipLengthParam, 10) : 0;

  return { captions, clipLengthInSeconds };
};

export const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};