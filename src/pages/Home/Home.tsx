import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// STYLE
import './styles.scss';

// COMPONENTS
import PageLayout from '../../components/PageLayout';
import VideoComponent from '../../components/VideoComponent/VideoComponent';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const Home: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const navigate = useNavigate();

  const createRoom = () => {
    if(name === '') return alert('Por favor, insira um nome');
    const roomId = uuidv4();

    navigate(`/chat/${roomId}`, {state: { name: name}});
  };

  const joinRoom = () => {
    if(name === '') return alert('Por favor, insira um nome');

    if (roomId) {
      navigate(`/chat/${roomId}`, {state: { name: name}});
    } else {
      alert('Por favor, insira um ID de sala válido.');
    }
  };

  return (
    <PageLayout>
      <div className='centralize'>
        <div className='textContainer'>
          <h1>Welcome to Space Chat</h1>
          <h2>
          Welcome to Space Chat, the ultimate video calling platform where you can connect with people from all corners of the galaxy!Join the interstellar conversation and experience the thrill of face-to-face interactions, no matter the distance.
          </h2>
        </div>

        <VideoComponent />

        <div className="inputContainer">
          <Input 
            icon={'icon'}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input 
            icon={'icon'}
            placeholder="Room id"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <Button onClick={createRoom}>
            Create room
          </Button>
          <Button onClick={joinRoom}>
            Join room
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}

export default Home;
