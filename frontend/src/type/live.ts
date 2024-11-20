type ChannelInfo = {
  channelId: string | null;
  channelName: string;
};

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
}
