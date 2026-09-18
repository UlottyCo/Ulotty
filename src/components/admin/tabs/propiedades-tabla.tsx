import { PropiedadesTablaClient } from "./propiedades-tabla-client";

interface PropiedadesTablaProps {
  filterStatus: string;
  filterType: string;
}

export function PropiedadesTabla({ filterStatus, filterType }: PropiedadesTablaProps) {
  return <PropiedadesTablaClient filterStatus={filterStatus} filterType={filterType} />;
}
