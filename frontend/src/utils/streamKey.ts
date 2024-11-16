type Key = 'StreamKey';

const key: Key = 'StreamKey';

export const getStreamKey = (): string => localStorage.getItem(key) ?? '';
export const setStreamKey = (StreamKey: string): void => localStorage.setItem(key, StreamKey);
