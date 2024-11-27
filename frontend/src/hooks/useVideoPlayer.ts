import { useReducer, useEffect, useRef } from 'react';
import {
  videoPlayerReducer,
  initialVideoPlayerState,
  VideoPlayerState,
  VideoPlayerAction
} from '@reducers/videoPlayerReducer';
import {
  setVolume,
  setCurrentTime,
  setDuration,
  setDvrEnabled,
  setAtLiveEdge,
  setBufferedSegments,
  setIsLive,
  setIsPlaying
} from '@reducers/actionCreators';
import { loadVolume, saveVolume } from '@utils/volume';
import Hls from 'hls.js';
import { VideoPlayerProps } from '@type/video';

interface UseVideoPlayerProps extends Pick<VideoPlayerProps, 'url' | 'isLive' | 'onTimeUpdate' | 'onDuration'> {
  playerContainerRef: React.RefObject<HTMLDivElement>;
}

const useVideoPlayer = ({ url, isLive = false, onTimeUpdate, onDuration, playerContainerRef }: UseVideoPlayerProps) => {
  const [state, dispatch] = useReducer(videoPlayerReducer, initialVideoPlayerState, (initial) => ({
    ...initial,
    volume: loadVolume(),
    isLive
  }));

  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (url.endsWith('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true
        });
        hlsRef.current = hls;
        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (isLive) {
            video.play().catch(console.error);
          }
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error('hls.js 오류:', data);
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari 같은 네이티브 HLS 지원 브라우저
        video.src = url;
        if (isLive) {
          video.play().catch(console.error);
        }
      } else {
        console.error('HLS를 지원하지 않는 브라우저입니다.');
      }
    } else {
      // 일반 비디오 파일
      video.src = url;
      if (isLive && state.isPlaying) {
        video.play().catch(console.error);
      }
    }

    video.volume = state.volume;
    video.muted = state.isMuted;

    const handlers: Partial<{ [K in keyof HTMLVideoElementEventMap]: (e: Event) => void }> = {
      progress: () => {
        dispatch(setBufferedSegments(video.buffered));
      },
      durationchange: () => {
        const newDuration = video.duration;
        dispatch(setDuration(newDuration));
        dispatch(setDvrEnabled(isLive && newDuration > 60));
        onDuration?.(newDuration);
      },
      play: () => {
        console.log('Video is playing');
        dispatch(setIsPlaying(true));
      },
      pause: () => {
        console.log('Video is paused');
        dispatch(setIsPlaying(false));
      },
      timeupdate: () => {
        const newTime = video.currentTime;
        dispatch(setCurrentTime(newTime));
        onTimeUpdate?.(newTime);

        if (isLive) {
          dispatch(setAtLiveEdge(video.duration - newTime < 1));
        }
      },
      ended: () => {
        dispatch(setIsLive(video.currentTime >= video.duration));
      },
      error: (e: Event) => {
        console.error('Video loading error:', e);
        const error = (e.target as HTMLVideoElement).error;
        if (error) {
          switch (error.code) {
            case error.MEDIA_ERR_ABORTED:
              console.error('비디오 로딩이 중단되었습니다.');
              break;
            case error.MEDIA_ERR_NETWORK:
              console.error('네트워크 오류로 비디오를 로드할 수 없습니다.');
              break;
            case error.MEDIA_ERR_DECODE:
              console.error('비디오 디코딩 중 오류가 발생했습니다.');
              break;
            case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
              console.error('비디오 형식이 지원되지 않습니다.');
              break;
            default:
              console.error('알 수 없는 오류가 발생했습니다.');
              break;
          }
        } else {
          console.error('비디오 로딩 중 알 수 없는 오류가 발생했습니다.');
        }
      }
    };

    Object.entries(handlers).forEach(([event, handler]) => {
      if (handler) {
        video.addEventListener(event, handler as EventListener);
      }
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        if (handler) {
          video.removeEventListener(event, handler as EventListener);
        }
      });

      // hls.js 인스턴스 정리
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [url, isLive, onDuration, onTimeUpdate, state.volume, state.isMuted]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (state.isPlaying) {
      video.pause();
    } else {
      video.play().catch(console.error);
    }
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !state.isMuted;
    dispatch(setVolume(video.muted ? 0 : state.volume)); // 음소거 상태에 따라 볼륨 업데이트
  };

  const handleVolumeChange = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    dispatch(setVolume(newVolume));
    saveVolume(newVolume);
    video.volume = newVolume;
    video.muted = newVolume === 0;
  };

  const seek = (newTime: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = newTime;
    dispatch(setCurrentTime(newTime));
    onTimeUpdate?.(newTime);
  };

  const goToLiveEdge = () => {
    const video = videoRef.current;
    if (!video || !state.dvrEnabled) return;

    seek(video.duration);
    dispatch(setAtLiveEdge(true));
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;

    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode:`, err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return {
    state,
    handlers: {
      handlePlayPause,
      handleMuteToggle,
      handleVolumeChange,
      handleTimeUpdate: () => {
        const video = videoRef.current;
        if (!video) return;

        const newTime = video.currentTime;
        dispatch(setCurrentTime(newTime));
        onTimeUpdate?.(newTime);
      },
      seek,
      goToLiveEdge,
      toggleFullscreen,
      videoRef
    }
  };
};

export default useVideoPlayer;
