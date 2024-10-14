'use client';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { redirect, usePathname } from 'next/navigation';
import { ThirdwebProvider } from 'thirdweb/react';
import { PagePath } from './config/nav';
import { useEffect } from 'react';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const queryClient = getQueryClient();
  const pathname = usePathname() as PagePath;

  useEffect(() => {
    const KYC = localStorage.getItem('KYC');

    if (pathname === PagePath.KYC) {
      if (KYC) {
        redirect(PagePath.Dashboard);
      }
    } else {
      if (!KYC) {
        redirect(PagePath.KYC);
      }
    }
  }, [pathname]);

  return (
    <ThirdwebProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThirdwebProvider>
  );
};
