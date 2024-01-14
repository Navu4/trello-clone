import React, { lazy, Suspense } from "react";

const loadable = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  { fallback = null }: { fallback?: React.ReactNode } = { fallback: null }
) => {
  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback !== null ? fallback : null}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
