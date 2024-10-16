'use client';

import { Provider } from '../provider';
import { DashboardProvider } from './dashboard-provider';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <DashboardProvider>{children}</DashboardProvider>
    </Provider>
  );
}
