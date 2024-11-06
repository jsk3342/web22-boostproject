import OfflineView from './OfflineView';
import OnlineView from './OnlineView';

interface StreamingViewProps {
  onStreaming: boolean;
  onToggleModal: () => void;
}

export default function StreamingView({ onStreaming, onToggleModal }: StreamingViewProps) {
  if (onStreaming) {
    return <OnlineView />;
  }

  return <OfflineView onToggleModal={onToggleModal} />;
}
