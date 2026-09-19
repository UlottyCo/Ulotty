export const dynamic = 'force-dynamic';

import { NotificationsProvider } from '@/lib/notifications-context';
import { Sidebar } from '@/components/admin/sidebar';

export default function PanelAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotificationsProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </NotificationsProvider>
  );
}
