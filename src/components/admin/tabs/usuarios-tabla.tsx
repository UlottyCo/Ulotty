import { UsuariosTablaClient } from "./usuarios-tabla-client";

interface UsuariosTablaProps {
  filterRole: string;
  filterStatus: string;
}

export function UsuariosTabla({ filterRole, filterStatus }: UsuariosTablaProps) {
  return <UsuariosTablaClient filterRole={filterRole} filterVerified={filterStatus === "verificacion" ? false : undefined} />;
}
