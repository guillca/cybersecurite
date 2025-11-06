
export interface Post {
  id: number;
  emitter: string;
  handle: string;
  message: string;
  time: number; // in minutes from start
  avatar: string;
  likes: number;
  retweets: number;
  views: number;
}

export enum SimulationStatus {
  Stopped = 'stopped',
  Running = 'running',
  Paused = 'paused',
  Finished = 'finished',
}
