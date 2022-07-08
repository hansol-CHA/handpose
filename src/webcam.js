import { useState, useEffect } from "react";

function useUserMedia (mediaConfig) {
  const [mediaStream, setMediaStream] = useState(null);

  const enableStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(mediaConfig);
      setMediaStream(stream);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!mediaStream) {
      enableStream();
    } else {
      return function cleanup () {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        })
      }
    }
  }, [mediaStream, mediaConfig])

  return mediaStream;
}

export { useUserMedia };