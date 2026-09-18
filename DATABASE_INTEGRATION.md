# Database Integration Guide - Ulotty Admin Panel

## Status

✅ **Complete Foundation** - All server actions and database schema ready
✅ **3 Pages Connected** - Propiedades, Usuarios, Comisiones fully integrated
🔄 **23 Pages Remaining** - Follow the pattern below to complete

---

## What's Implemented

### Database Schema (`database/schema.sql`)
- ✅ All tables created (users, properties, operations, commissions, etc.)
- ✅ RLS policies configured  
- ✅ Indexes created for performance
- **Next**: Run schema.sql in Supabase SQL Editor

### Server Actions (`src/app/actions/`)
- ✅ `properties.ts` - Get, create, update properties + stats
- ✅ `users.ts` - Get, update, verify users + stats
- ✅ `operations.ts` - Get, create, update operations + stats
- ✅ `commissions.ts` - Get, create, pay commissions + stats
- ✅ `notifications.ts` - Get, create, mark as read notifications + stats
- ✅ `audit.ts` - Create and get audit logs
- ✅ `moderation.ts` - Get, create, update moderation reports + stats
- ✅ `support.ts` - Get, create, update support tickets + stats
- ✅ `invoices.ts` - Get, create, mark paid invoices + stats
- ✅ `sessions.ts` - Get, close sessions + stats
- ✅ `webhooks.ts` - Get, create, toggle webhooks + stats
- ✅ `analytics.ts` - Get traffic, device, pages data
- ✅ `reports.ts` - Generate reports (sales, users, properties)
- ✅ `backups.ts` - Get, create, restore backups + stats

### Connected Pages (3/26)
- ✅ `/panel-admin/propiedades` - Full integration with real data
- ✅ `/panel-admin/usuarios` - Full integration with real data  
- ✅ `/panel-admin/comisiones` - Full integration with real data

---

## Pattern to Complete Remaining 23 Pages

### Step 1: Create Client Component
Create `src/app/panel-admin/[page]/[page]-client.tsx`:

```typescript
"use client";

import { useEffect, useState } from "react";
import { get[Entity]Stats, get[Entity] } from "@/app/actions/[entity]";

export function [Entity]Client() {
  const [stats, setStats] = useState({/* stats structure */});
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, itemsData] = await Promise.all([
          get[Entity]Stats(),
          get[Entity](),
        ]);
        setStats(statsData);
        setData(itemsData || []);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Render KPI cards with stats
  // Render table with data
  // Handle actions (approve, pay, close, etc.)
}
```

### Step 2: Update Page Component
Replace the hardcoded data in `src/app/panel-admin/[page]/page.tsx`:

```typescript
// BEFORE
export default async function PagePage() {
  const data = [{ mock: "data" }];
  return (
    <div>
      {/* Hardcoded KPIs and tables */}
    </div>
  );
}

// AFTER
import { [Entity]Client } from "./[page]-client";

export default function PagePage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Page Title</h1>
          <p className="text-muted mt-2">Description</p>
        </div>
        <[Entity]Client />
      </div>
    </div>
  );
}
```

### Step 3: Update Table Components (if using tab-based layout)
For pages with tabs, update `src/components/admin/[page]-content.tsx`:

```typescript
"use client";

import { useEffect, useState } from "react";
import { get[Entity]Stats } from "@/app/actions/[entity]";

export function [Entity]Content() {
  const [stats, setStats] = useState({/* stats */});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await get[Entity]Stats();
        setStats(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div>
      {/* KPI Cards with real stats */}
      {/* Tabs that use client components for data */}
    </div>
  );
}
```

---

## Pages to Connect (Priority Order)

### TIER 1: CRITICAL (5 pages)
1. **Dashboard** (`/panel-admin/dashboard`)
   - Use: `getPropertyStats()`, `getUserStats()`, `getOperationStats()`, `getAnalyticsStats()`
   - Pattern: KPI cards + charts

2. **Operaciones** (`/panel-admin/operaciones`)
   - Use: `getOperations()`, `getOperationStats()`, `updateOperation()`
   - Pattern: KPI cards + filterable table

3. **Reportes** (`/panel-admin/reportes`)
   - Use: `getReports()`, `generateSalesReport()`, `generateUserReport()`, etc.
   - Pattern: Report list + generation buttons

4. **Notificaciones** (`/panel-admin/notificaciones`)
   - Use: `getNotifications()`, `markNotificationAsRead()`, `getNotificationStats()`
   - Pattern: KPI cards + notification list

5. **Analytics** (`/panel-admin/analytics`)
   - Use: `getAnalyticsData()`, `getDeviceBreakdown()`, `getTopPages()`, `getTrafficSources()`
   - Pattern: KPI cards + device chart + traffic sources

### TIER 2: HIGH (10 pages)
6. Auditoria - Use `getAuditLogs()`, `getAuditLogStats()`
7. Soporte - Use `getSupportTickets()`, `getSupportTicketStats()`, `updateSupportTicket()`
8. Moderacion - Use `getModerationReports()`, `getModerationStats()`
9. Facturacion - Use `getInvoices()`, `getInvoiceStats()`, `markInvoiceAsPaid()`
10. Sesiones - Use `getSessions()`, `getSessionStats()`, `closeSession()`
11. Webhooks - Use `getWebhooks()`, `getWebhookStats()`, `toggleWebhook()`
12. Backups - Use `getBackups()`, `getBackupStats()`, `restoreBackup()`
13. Configuracion - Use `getSettings()`, `updateSettings()`
14. Seguridad - Use audit logs and security config
15. Equipo - Use `getUsers({ role: 'admin' })`, `getUsers({ role: 'moderador' })`

### TIER 3: MEDIUM (10+ pages)
Remaining pages (Campañas, Suscripciones, Documentos, API, Logs, etc.)

---

## Quick Reference: Available Server Actions

### Stats Functions
```typescript
getPropertyStats() → { total, published, pending, rejected }
getUserStats() → { total, verified, agents, unverified }
getOperationStats() → { total, completed, totalAmount, completedAmount }
getCommissionStats() → { total, paid, pending, totalAmount, paidAmount, pendingAmount }
getNotificationStats() → { total, unread, highPriority }
getAuditLogStats() → { totalToday, totalAll, actionBreakdown }
getModerationStats() → { total, open, resolved, pending }
getSupportTicketStats() → { total, open, highPriority, closed }
getInvoiceStats() → { total, paid, pending, totalAmount, paidAmount, pendingAmount }
getSessionStats() → { activeSessions, activeUsers, uniqueDevices }
getWebhookStats() → { total, active, totalDeliveries, avgSuccessRate }
getBackupStats() → { total, completed, totalSizeGB, lastBackupDate }
getAnalyticsStats() → { activeSessions, pageViews, transactions, avgSessionDuration }
```

### Data Functions
```typescript
getProperties(filters?) → Property[]
getUsers(filters?) → User[]
getOperations(filters?) → Operation[]
getCommissions(filters?) → Commission[]
getNotifications(userId, unreadOnly?) → Notification[]
getAuditLogs(filters?) → AuditLog[]
getModerationReports(filters?) → ModerationReport[]
getSupportTickets(filters?) → SupportTicket[]
getInvoices(filters?) → Invoice[]
getSessions(filters?) → Session[]
getWebhooks(filters?) → Webhook[]
getBackups() → Backup[]
```

---

## Implementation Checklist

- [ ] Create database schema in Supabase (run `database/schema.sql`)
- [ ] Test server actions with sample data
- [ ] Connect Dashboard
- [ ] Connect Operaciones
- [ ] Connect Reportes
- [ ] Connect Notificaciones
- [ ] Connect Analytics
- [ ] Connect remaining TIER 2 pages (10)
- [ ] Connect remaining TIER 3 pages
- [ ] Test all filters and actions
- [ ] Implement error handling globally
- [ ] Add loading states
- [ ] Performance testing with large datasets

---

## Common Patterns

### KPI Card Component
```typescript
<div className="grid grid-cols-4 gap-4 mb-8">
  <div className="bg-surface rounded-lg border border-border p-6">
    <div className="text-sm text-muted mb-2">Label</div>
    <div className="text-2xl font-bold text-brand">{value}</div>
    <div className="text-xs text-muted mt-2">Secondary info</div>
  </div>
</div>
```

### Table Header
```typescript
<thead>
  <tr className="border-b border-border">
    <th className="text-left py-3 px-4 font-semibold">Column 1</th>
    <th className="text-left py-3 px-4 font-semibold">Column 2</th>
  </tr>
</thead>
```

### Status Badge
```typescript
<span className={`px-2 py-1 rounded-full text-xs font-semibold ${
  status === "activa" ? "bg-green-100 text-green-700" :
  status === "pendiente" ? "bg-yellow-100 text-yellow-700" :
  "bg-red-100 text-red-700"
}`}>
  {status}
</span>
```

---

## Estimated Remaining Work

- **5 pages** (Dashboard + TIER 1): ~2-3 hours
- **10 pages** (TIER 2): ~3-4 hours
- **10+ pages** (TIER 3): ~2-3 hours
- **Testing + Polish**: ~1-2 hours

**Total: ~8-12 hours** for full integration (or ~3 hours to reach MVP with top 10 pages)

---

## Notes

- All server actions handle errors - wrap calls in try/catch
- Database schema includes RLS - all data access is user-scoped
- Stats calculations are done server-side in actions
- Client components handle loading/error states
- Use `useEffect` to avoid data fetching loops
- Filters are passed to server actions, not handled client-side
