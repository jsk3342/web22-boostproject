import ReactDOM from 'react-dom';

export function usePortal() {
  const createPortal = (children: React.ReactNode) => {
    return ReactDOM.createPortal(children, document.getElementById('portal') as HTMLElement);
  };

  return createPortal;
}
