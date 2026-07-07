"use client";

export default function Error({
  error: _error,
}: {
  error: Error & { digest?: string };
}) {
  void _error;
  return (
    <div className="wrap py-24 text-center">
      <span className="label">Error</span>
      <h1 className="heading-lg mt-3 mb-4">Algo salio mal</h1>
      <p className="body-lg text-text-secondary mb-8">
        Ocurrio un error inesperado. Intenta recargar la pagina.
      </p>
      <button onClick={() => window.location.reload()} className="btn-primary">
        Recargar pagina
      </button>
    </div>
  );
}
