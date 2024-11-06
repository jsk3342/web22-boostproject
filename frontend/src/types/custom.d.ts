declare module '*.svg' {
  const content: any;
  export default content;

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}
