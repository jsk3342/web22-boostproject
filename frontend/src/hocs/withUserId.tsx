import { initializeUserId } from '@utils/id';

export default function withUserId(WrappedComponent: React.ComponentType) {
  return function WithUserIdComponent(props: any) {
    initializeUserId();
    return <WrappedComponent {...props} />;
  };
}
