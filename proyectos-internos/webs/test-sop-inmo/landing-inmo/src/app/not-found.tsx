import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-24 text-center">
      <span className="label">404</span>
      <h1 className="heading-lg mt-3 mb-4">Pagina no encontrada</h1>
      <p className="body-lg text-text-secondary mb-8 max-w-md mx-auto">
        La pagina que buscas no existe o fue movida.
      </p>
      <Link href="/" className="btn-primary">Volver al inicio</Link>
    </div>
  );
}
