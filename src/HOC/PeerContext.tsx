import React, { createContext, useState, ReactNode, useContext } from 'react';

interface PeerContextValue {
  peer: any | null;
  setPeer: (peer: any | null) => void;
  stream: MediaStream | null;
  setStream: (stream: MediaStream | null) => void;
}

const PeerContext = createContext<PeerContextValue | undefined>(undefined);

export function usePeerContext(): PeerContextValue {
  const context = useContext(PeerContext);
  if (!context) {
    throw new Error('usePeerContext must be used within a PeerProvider');
  }
  return context;
}

interface PeerProviderProps {
  children: ReactNode;
}

export function PeerProvider({ children }: PeerProviderProps) {
  const [peer, setPeer] = useState<any | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const contextValue: PeerContextValue = {
    peer,
    setPeer,
    stream,
    setStream,
  };

  return (
    <PeerContext.Provider value={contextValue}>
      {children}
    </PeerContext.Provider>
  );
}

export function withPeerContext<T extends object>(Component: React.ComponentType<T>) {
  return function WithPeerContext(props: T) {
    return (
      <PeerProvider>
        <Component {...props} />
      </PeerProvider>
    );
  };
}
