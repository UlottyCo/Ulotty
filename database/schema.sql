-- Ulotty Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==================== USERS & AUTHENTICATION ====================

-- Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('comprador', 'particular', 'agente', 'desarrolladora', 'admin', 'moderador')),
  phone TEXT,
  bio TEXT,
  location TEXT,
  verified BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3, 1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== PROPIEDADES (PROPERTIES) ====================

CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('casa', 'departamento', 'terreno', 'comercial', 'lote')),
  operation TEXT CHECK (operation IN ('venta', 'renta', 'venta_renta')),
  price DECIMAL(15, 2),
  rental_price DECIMAL(15, 2),
  area DECIMAL(10, 2),
  bedrooms INT,
  bathrooms INT,
  location TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  postal_code TEXT,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  amenities TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT CHECK (status IN ('pendiente', 'aprobada', 'rechazada', 'activa', 'vendida', 'rentada')) DEFAULT 'pendiente',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== OPERACIONES (OPERATIONS) ====================

CREATE TABLE IF NOT EXISTS public.operations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  buyer_id UUID REFERENCES public.profiles(id),
  seller_id UUID REFERENCES public.profiles(id),
  agent_id UUID REFERENCES public.profiles(id),
  transaction_type TEXT CHECK (transaction_type IN ('venta', 'renta', 'clausurada')),
  amount DECIMAL(15, 2),
  status TEXT CHECK (status IN ('pendiente', 'en_proceso', 'completada', 'cancelada')) DEFAULT 'pendiente',
  payment_method TEXT,
  payment_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== COMISIONES (COMMISSIONS) ====================

CREATE TABLE IF NOT EXISTS public.commissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  operation_id UUID NOT NULL REFERENCES public.operations(id) ON DELETE CASCADE,
  amount DECIMAL(15, 2),
  percentage DECIMAL(5, 2),
  status TEXT CHECK (status IN ('pendiente', 'pagada', 'parcial')) DEFAULT 'pendiente',
  payment_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== NOTIFICACIONES ====================

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT CHECK (type IN ('info', 'success', 'warning', 'error', 'alert')),
  priority TEXT CHECK (priority IN ('baja', 'media', 'alta')) DEFAULT 'media',
  read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ==================== REPORTES (REPORTS) ====================

CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_type TEXT CHECK (report_type IN ('ventas', 'usuarios', 'propiedades', 'financiero', 'auditoria')),
  title TEXT NOT NULL,
  data JSONB,
  generated_by UUID REFERENCES public.profiles(id),
  generated_at TIMESTAMP DEFAULT NOW(),
  period_start DATE,
  period_end DATE
);

-- ==================== CONFIGURACION ====================

CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT,
  description TEXT,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(category, key)
);

-- ==================== AUDITORIA ====================

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  changes JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ==================== MODERACION ====================

CREATE TABLE IF NOT EXISTS public.moderation_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reported_by UUID NOT NULL REFERENCES public.profiles(id),
  reported_user_id UUID REFERENCES public.profiles(id),
  reported_property_id UUID REFERENCES public.properties(id),
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('abierto', 'en_revision', 'resuelto', 'desestimado')) DEFAULT 'abierto',
  resolution_notes TEXT,
  resolved_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== SOPORTE (SUPPORT TICKETS) ====================

CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('abierto', 'en_proceso', 'resuelto', 'cerrado')) DEFAULT 'abierto',
  priority TEXT CHECK (priority IN ('baja', 'media', 'alta')) DEFAULT 'media',
  assigned_to UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== CAMPANAS (CAMPAIGNS) ====================

CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID NOT NULL REFERENCES public.profiles(id),
  status TEXT CHECK (status IN ('borrador', 'activa', 'pausada', 'completada')) DEFAULT 'borrador',
  start_date DATE,
  end_date DATE,
  budget DECIMAL(15, 2),
  impressions INT DEFAULT 0,
  clicks INT DEFAULT 0,
  conversions INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== SUSCRIPCIONES ====================

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2),
  billing_cycle TEXT CHECK (billing_cycle IN ('monthly', 'yearly')),
  features TEXT[] DEFAULT ARRAY[]::TEXT[],
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ==================== DOCUMENTOS ====================

CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  file_size INT,
  uploaded_by UUID NOT NULL REFERENCES public.profiles(id),
  download_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ==================== WEBHOOKS ====================

CREATE TABLE IF NOT EXISTS public.webhooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  event_type TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  delivery_count INT DEFAULT 0,
  success_rate DECIMAL(5, 2) DEFAULT 0,
  last_triggered_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ==================== FACTURACION ====================

CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  concept TEXT,
  amount DECIMAL(15, 2),
  status TEXT CHECK (status IN ('pendiente', 'pagada')) DEFAULT 'pendiente',
  payment_method TEXT,
  payment_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== SESIONES ====================

CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  device TEXT,
  ip_address INET,
  location TEXT,
  user_agent TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  last_activity TIMESTAMP DEFAULT NOW()
);

-- ==================== BACKUPS ====================

CREATE TABLE IF NOT EXISTS public.backups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  backup_date DATE NOT NULL,
  size_gb DECIMAL(10, 2),
  status TEXT CHECK (status IN ('completado', 'en_proceso', 'fallido')) DEFAULT 'completado',
  duration_minutes INT,
  backup_type TEXT CHECK (backup_type IN ('automatico', 'manual')),
  location TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ==================== INDEXES ====================

CREATE INDEX IF NOT EXISTS idx_properties_owner_id ON public.properties(owner_id);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_operations_property_id ON public.operations(property_id);
CREATE INDEX IF NOT EXISTS idx_operations_status ON public.operations(status);
CREATE INDEX IF NOT EXISTS idx_commissions_agent_id ON public.commissions(agent_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON public.sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON public.support_tickets(user_id);

-- ==================== RLS POLICIES ====================

-- Disable RLS temporarily for setup
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.operations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions DISABLE ROW LEVEL SECURITY;

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all profiles, update only their own
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Properties: Anyone can view, owner can modify
CREATE POLICY "Properties are viewable by everyone" ON public.properties
  FOR SELECT USING (true);

CREATE POLICY "Users can insert properties" ON public.properties
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own properties" ON public.properties
  FOR UPDATE USING (auth.uid() = owner_id);

-- Notifications: Users can only see their own
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Audit logs: Only admins can view
CREATE POLICY "Only admins can view audit logs" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Sessions: Users can view their own sessions
CREATE POLICY "Users can view own sessions" ON public.sessions
  FOR SELECT USING (auth.uid() = user_id);
