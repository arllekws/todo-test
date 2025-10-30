/* eslint-disable @typescript-eslint/no-require-imports */
// Arquivo: src/svg.d.ts

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
