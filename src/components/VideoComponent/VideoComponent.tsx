import React, { useRef, useEffect, ChangeEvent, useState } from 'react';

// STYLES
import './styles.scss'

// COMPONENTS
import Select from '../Select/Select';

// ASSETS
import { DotIcon, CameraIcon, MicrophoneIcon } from '../../styles/icons';

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

        const trackToStop = tracks.find(track => track.kind === name);
        if (trackToStop) {
          trackToStop.stop();
        }

        const newStream = await navigator.mediaDevices.getUserMedia({
          [name]: { deviceId: value },
        });

        const newTrack = newStream.getTracks().find(track => track.kind === name);
        if (newTrack) {
          stream.addTrack(newTrack);
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
        <DotIcon />
      </div>

      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <div className="textContainer">
            <p className='title'>Devices</p>
            <span onClick={() => setIsOpen(false)}>X</span>
          </div>

          <div className='micContainer'>
            <Select id="audio-input" name="audio" onChange={handleInputChange} icon={<MicrophoneIcon />}>
              {audioDevices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </Select>
          </div>

          <div className='webcamContainer'>
            <Select id="video-input" name="video" onChange={handleInputChange} icon={<CameraIcon />}>
              {videoDevices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
