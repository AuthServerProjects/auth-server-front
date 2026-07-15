/// <reference types="vite/client" />

declare module "*.svg?react" {
  import type { FunctionComponent, SVGProps } from "react";
  const ReactComponent: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}

interface ImportMetaEnv {
  readonly VITE_REACT_APP_VERSION: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_API_PREFIX: string;
  readonly VITE_ADMIN_PREFIX: string;
  readonly VITE_AUTH_PREFIX: string;
  readonly VITE_AUTH_SERVER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
