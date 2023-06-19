import React, { useRef, useEffect, ChangeEvent, useState } from 'react';
import './styles.scss'

const VideoComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);


  useEffect(() => {
    const getMediaDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputDevices = devices.filter(device => device.kind === 'audioinput');
        const videoInputDevices = devices.filter(device => device.kind === 'videoinput');
        setAudioDevices(audioInputDevices);
        setVideoDevices(videoInputDevices);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    getMediaDevices();
  }, []);

  useEffect(() => {
    const constraints = { audio: true, video: true };

    const getMediaStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    getMediaStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();

        tracks.forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  const handleInputChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    try {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();

        tracks.forEach(track => {
          if (track.kind === name) {
            track.stop();
          }
        });

        const newStream = await navigator.mediaDevices.getUserMedia({
          [name]: { deviceId: value },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
      }
    } catch (error) {
      console.error('Error changing media devices:', error);
    }
  };

  return (
    <div className='container'>
      <video ref={videoRef} autoPlay playsInline></video>

      <div className='iconContainer' onClick={() => setIsOpen(true)}>
        X
      </div>

      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <p>Devices</p>
          <p onClick={() => setIsOpen(false)}>X</p>
          <div>
            <label htmlFor="audio-input">Microphone:</label>
            <select id="audio-input" name="audio" onChange={handleInputChange}>
              {audioDevices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="video-input">Camera:</label>
            <select id="video-input" name="video" onChange={handleInputChange}>
              {videoDevices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
