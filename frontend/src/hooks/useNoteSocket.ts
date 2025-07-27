import { useEffect } from 'react';
import { socket } from '../api/socket';
import { getNote } from '../api/noteApi';

export function useNoteSocket(currentKey: string, onUpdate: (value: string) => void) {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit('subscribe_key', currentKey);

    const handler = async ({ key }: { key: string }) => {
      const res = await getNote(key);
      onUpdate(res.value);
    };

    socket.on('note_updated', handler);

    return () => {
      socket.emit('unsubscribe_key', currentKey);
      socket.off('note_updated', handler);
    };
  }, [currentKey, onUpdate]);
}
