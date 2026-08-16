/**
 * Inyecta datos estructurados schema.org.
 * Se renderiza en el HTML del servidor, así que Google lo lee sin ejecutar JS.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // El contenido lo generamos nosotros desde @/lib/seo, nunca viene del usuario.
      // Escapamos "<" para que un valor con "</script>" no pueda cerrar la etiqueta.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
