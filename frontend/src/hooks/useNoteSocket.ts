import { useEffect } from 'react';
import { socket } from '../api/socket';
import { getNote } from '../api/noteApi';

export function useNoteSocket(currentKey: string, onUpdate: (value: string) => void, onLiveUpdate: (isLive: boolean) => void) {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    if (!currentKey) return;

    socket.emit('subscribe_key', currentKey);

    const handler = async ({ key }: { key: string }) => {
      const res = await getNote(key);
      onUpdate(res.value);
    };

    const liveHandler = (isLive: boolean) => {
      onLiveUpdate(isLive);
    }

    socket.on('note_updated', handler);
    socket.on('live', liveHandler);

    return () => {
      socket.emit('unsubscribe_key', currentKey);
      socket.off('note_updated', handler);
      socket.off('live', liveHandler);
    };
  }, [currentKey]);
}
