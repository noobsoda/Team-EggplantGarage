import React, { useRef } from "react";
import { useEffect } from "react";

export default function OpenViduVideoComponent({ streamManager }) {
  const videoRef = useRef(undefined);

  useEffect(() => {
    streamManager.addVideoElement(videoRef.current);
  }, [streamManager]);

  return <video height={"100%"} autoPlay={true} ref={videoRef} />;
}
