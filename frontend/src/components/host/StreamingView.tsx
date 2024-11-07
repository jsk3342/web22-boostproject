import OfflineView from './OfflineView';
import OnlineView from './OnlineView';

interface StreamingViewProps {
  onStreaming: boolean;
  closeModal: () => void;
}

export default function StreamingView({ onStreaming, closeModal }: StreamingViewProps) {
  if (onStreaming) {
    return <OnlineView />;
  }

  return <OfflineView closeModal={closeModal} />;
}
