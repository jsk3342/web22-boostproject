import { getOrCreateId } from '@utils/id';

export default function withUserId(WrappedComponent: React.ComponentType) {
  return function WithUserIdComponent(props: any) {
    getOrCreateId();
    return <WrappedComponent {...props} />;
  };
}
