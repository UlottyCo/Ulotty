export function SeguridadGeneral() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Información de protección</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-muted mb-1">Certificado SSL/TLS</p>
            <p className="font-semibold">Válido hasta 15 mayo 2027</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-muted mb-1">Encriptación de datos</p>
            <p className="font-semibold">AES-256 en tránsito y reposo</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-muted mb-1">Protección DDoS</p>
            <p className="font-semibold">Cloudflare Enterprise</p>
          </div>
          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-muted mb-1">Última auditoría de seguridad</p>
            <p className="font-semibold">12 de septiembre 2026</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold mb-4">Configuración general</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Forzar HTTPS</p>
              <p className="text-sm text-muted">Todas las conexiones deben ser HTTPS</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-semibold">Política de seguridad de contenido</p>
              <p className="text-sm text-muted">Protección contra ataques XSS</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-semibold">Headers de seguridad</p>
              <p className="text-sm text-muted">X-Frame-Options, X-Content-Type-Options</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-semibold">Rate limiting</p>
              <p className="text-sm text-muted">Limitar solicitudes por IP</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
}
