import { lazy } from "react";
import type { ComponentType } from "react";

export const lazyRemote = <T>(
  loader: () => Promise<Record<string, ComponentType<T>>>,
  exportName: string = "default",
) => {
  return lazy(() => loader().then((m) => ({ default: m[exportName] })));
};
