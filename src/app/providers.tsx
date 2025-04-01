'use client';

import { SWRConfig } from 'swr';
import React, { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SWRConfig 
      value={{
        revalidateOnFocus: true,
        revalidateIfStale: true,
        revalidateOnReconnect: true,
        onError: () => {
          // Error handling without logging
        },
      }}
    >
      {children}
    </SWRConfig>
  );
} 