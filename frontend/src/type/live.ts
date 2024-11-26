import { ChannelInfo } from './channel';
export interface MainLive {
  id: number;
  liveId: string;
  liveTitle: string;
  liveImageUrl: string;
  category: string;
  defaultThumbnailImageUrl: string;
  concurrentUserCount: number;
  channel: ChannelInfo;
}

export interface RecentLive extends MainLive {
  tags: string[];
  startDate: Date;
  endDate: Date;
}

export interface ClientLive extends MainLive {
  tags: string[];
  startDate: Date;
  endDate: Date;
}
