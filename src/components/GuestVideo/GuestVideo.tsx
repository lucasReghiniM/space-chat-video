import React, { useEffect, useRef } from 'react';

interface Props {
  props: MediaStream | any;
}

const GuestVideoComponent: React.FC<Props> = ({ props }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    props.peer.on("stream", (stream: any) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

  return <video ref={videoRef} autoPlay playsInline />;
};

export default GuestVideoComponent;
