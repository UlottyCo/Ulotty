#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedDatabase() {
  try {
    console.log('🔗 Connecting to Supabase...\n');

    // Profiles
    const profiles = [
      { id: '11111111-1111-1111-1111-111111111111', email: 'juan@example.com', full_name: 'Juan Martínez', role: 'agente', phone: '+34912345678', verified: true, rating: 4.5, active: true },
      { id: '22222222-2222-2222-2222-222222222222', email: 'maria@example.com', full_name: 'María García', role: 'comprador', phone: '+34987654321', verified: true, rating: 4.8, active: true },
      { id: '33333333-3333-3333-3333-333333333333', email: 'carlos@example.com', full_name: 'Carlos Rodríguez', role: 'agente', phone: '+34913579246', verified: true, rating: 4.2, active: true },
      { id: '44444444-4444-4444-4444-444444444444', email: 'ana@example.com', full_name: 'Ana López', role: 'comprador', phone: '+34924681357', verified: false, rating: 4.0, active: true }
    ];

    console.log('👥 Inserting 4 profiles...');
    const { error: e1 } = await supabase.from('profiles').upsert(profiles).select();
    if (e1) console.log('⚠️ ', e1.message);
    else console.log('✓ Done\n');

    // Properties - SOLO 1
    const properties = [
      { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', owner_id: '11111111-1111-1111-1111-111111111111', title: 'Hermoso Apartamento en Centro', description: 'Apartamento de 2 habitaciones con balcón', type: 'departamento', operation: 'venta', price: 250000, area: 85, bedrooms: 2, bathrooms: 1, address: 'Calle Principal 123', city: 'Madrid', state: 'Madrid', country: 'España', postal_code: '28001', status: 'activa', featured: true }
    ];

    console.log('🏠 Inserting 1 property...');
    const { error: e2 } = await supabase.from('properties').upsert(properties).select();
    if (e2) console.log('⚠️ ', e2.message);
    else console.log('✓ Done\n');

    // Operations
    const operations = [
      { id: 'op111111-1111-1111-1111-111111111111', property_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', buyer_id: '22222222-2222-2222-2222-222222222222', seller_id: '11111111-1111-1111-1111-111111111111', agent_id: '11111111-1111-1111-1111-111111111111', transaction_type: 'venta', amount: 250000, status: 'completada', payment_method: 'Hipoteca', payment_date: '2026-09-10' }
    ];

    console.log('📋 Inserting 1 operation...');
    const { error: e3 } = await supabase.from('operations').upsert(operations).select();
    if (e3) console.log('⚠️ ', e3.message);
    else console.log('✓ Done\n');

    // Commissions
    const commissions = [
      { id: 'comm1111-1111-1111-1111-111111111111', agent_id: '11111111-1111-1111-1111-111111111111', operation_id: 'op111111-1111-1111-1111-111111111111', amount: 7500, percentage: 3.0, status: 'pagada', payment_date: '2026-09-15' }
    ];

    console.log('💰 Inserting 1 commission...');
    const { error: e4 } = await supabase.from('commissions').upsert(commissions).select();
    if (e4) console.log('⚠️ ', e4.message);
    else console.log('✓ Done\n');

    console.log('✨ Database ready!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✓ Profiles:    4');
    console.log('✓ Properties:  1');
    console.log('✓ Operations:  1');
    console.log('✓ Commissions: 1');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🎉 Refresh your browser!\n');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedDatabase();
