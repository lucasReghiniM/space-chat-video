import React, { useEffect, useRef } from 'react';

interface Props {
  stream: MediaStream | null;
}

const GuestVideoComponent: React.FC<Props> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return <video ref={videoRef} autoPlay playsInline />;
};

export default GuestVideoComponent;
