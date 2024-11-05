import NodeMediaServer from 'nodeMediaServer';

const httpConfig = {
  port: 8000,
  allow_origin: "*",
  mediaroot: "../nodeMediaServer/media",
};

const rtmpConfig = {
  port: 1935,
  chunk_size: 60000,
  gop_cache: true,
  ping: 10,
  ping_timeout: 60,
};

const transformationConfig = {
  ffmpeg: "../nodeMediaServer/ffmpeg",
  tasks: [
    {
      app: "live",
      hls: true,
      hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
      hlsKeep: false,
    },
  ],
  MediaRoot: "../nodeMediaServer/media",
};

const config = {
  http: httpConfig,
  rtmp: rtmpConfig,
  trans: transformationConfig,
};

const nodeMediaServer = new NodeMediaServer(config);

nodeMediaServer.run();
