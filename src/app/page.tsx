export default function Home() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>🚀 Ulotty - LIVE en Vercel</h1>
      <p style={{ fontSize: '18px', color: '#666' }}>
        Aplicación desplegada exitosamente
      </p>
      
      <div style={{ marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="/panel-admin/dashboard" style={{ padding: '10px 20px', background: '#463f35', color: 'white', textDecoration: 'none', borderRadius: '6px' }}>
          📊 Panel Admin
        </a>
        <a href="/propiedades" style={{ padding: '10px 20px', background: '#463f35', color: 'white', textDecoration: 'none', borderRadius: '6px' }}>
          🏠 Propiedades
        </a>
      </div>

      <div style={{ marginTop: '60px', fontSize: '14px', color: '#999' }}>
        <p>✅ Supabase conectado</p>
        <p>✅ Vercel deployed</p>
        <p>✅ 12 características implementadas</p>
      </div>
    </div>
  );
}
