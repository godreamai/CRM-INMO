import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Shield, Cookie, Eye, Lock, Mail, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad y protección de datos de Go Dream Ai. Conocé cómo protegemos tu información.',
}

export default function PrivacidadPage() {
  const lastUpdated = '3 de diciembre de 2024'

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full text-sm font-semibold text-foreground/70 mb-4">
              <Shield className="w-4 h-4" />
              DOCUMENTO LEGAL
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Política de <span className="text-gradient">Privacidad</span>
            </h1>
            <p className="text-foreground/70 flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Última actualización: {lastUpdated}
            </p>
          </div>

          {/* Contenido */}
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">

            {/* Introducción */}
            <section className="bg-foreground/5 rounded-2xl p-6 md:p-8">
              <p className="text-foreground/80 leading-relaxed">
                En <strong>Go Dream Ai</strong> (godreamai.com), respetamos tu privacidad y nos comprometemos a proteger
                tus datos personales. Esta política explica qué información recopilamos, cómo la usamos y cuáles son
                tus derechos.
              </p>
            </section>

            {/* Sección 1 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-accent-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">1. Información que procesamos</h2>
              </div>

              <div className="space-y-4 text-foreground/80">
                <p><strong>Información del cliente (Persona Física):</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Identidad (Nombre y apellido)</li>
                  <li>Contacto (Email, WhatsApp)</li>
                </ul>

                <p><strong>Datos Operativos del Negocio (Sensible):</strong></p>
                <p>Al diseñar arquitecturas operativas, podemos tener acceso a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Estructuras de costos y bases de datos de ventas.</li>
                  <li>Lógicas de procesos internos y flujos de trabajo.</li>
                  <li>Tokens de acceso a servicios mediante protocolos cifrados.</li>
                </ul>

                <p className="bg-lime-500/5 border border-lime-500/20 rounded-xl p-4 italic">
                  <strong>Nota sobre Datos Sensibles:</strong> GDAI no almacena datos de transacciones finales en sus servidores propios, sino que orquesta el flujo de estos datos entre los servicios del cliente.
                </p>
              </div>
            </section>

            {/* Sección 2 - Cookies */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-accent-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">2. Tecnologías de Medición</h2>
              </div>

              <div className="space-y-4 text-foreground/80">
                <p>Utilizamos cookies y analíticas mínimas para entender el rendimiento del sitio. No utilizamos pixeles de rastreo invasivos destinados a la venta de perfiles publicitarios a terceros.</p>
              </div>
            </section>

            {/* Sección 3 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-accent-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground m-0">3. Protección y Confidencialidad Operativa</h2>
              </div>

              <div className="space-y-4 text-foreground/80">
                <p>Usamos tu información exclusivamente para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Configurar los flujos de automatización solicitados.</li>
                  <li>Validar la integridad de los datos entre sistemas conectados.</li>
                  <li>Optimizar la arquitectura operativa entregada.</li>
                </ul>

                <p className="bg-black text-white rounded-xl p-6 shadow-xl border border-white/5">
                  <strong>🔒 Compromiso de Confidencialidad (NDA Implícito):</strong> Go Dream AI actúa como un socio de infraestructura. Tenemos prohibido por contrato interno el uso, divulgación o aprovechamiento de cualquier secreto comercial o métrica de negocio a la que tengamos acceso durante el proceso de automatización.
                </p>
              </div>
            </section>

            {/* Sección 4 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Ecosistema de Automatización</h2>
              <div className="space-y-4 text-foreground/80">
                <p>Para la ejecución de la arquitectura operativa, utilizamos entornos seguros en:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>n8n:</strong> Orquestación de lógica de negocio.</li>
                  <li><strong>Supabase / Google Cloud:</strong> Almacenamiento técnico cifrado.</li>
                  <li><strong>OpenAI / Anthropic:</strong> Procesamiento de lenguaje natural mediante APIs empresariales (donde los datos no se usan para entrenar modelos públicos).</li>
                </ul>
              </div>
            </section>

            {/* Sección 5 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Tus derechos</h2>
              <div className="space-y-4 text-foreground/80">
                <p>En cualquier momento puedes solicitar la revocación de accesos otorgados a GDAI sobre tus plataformas una vez finalizado el servicio de mantenimiento o implementación.</p>
              </div>
            </section>

            {/* Sección 6 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Seguridad de Infraestructura</h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  Toda la comunicación de datos se realiza bajo protocolos TLS/SSL. Las llaves de API y credenciales críticas se gestionan mediante bóvedas de secretos (Secrets Management) para asegurar que ningún humano, fuera de la implementación técnica necesaria, tenga visibilidad de las mismas.
                </p>
              </div>
            </section>

            {/* Contacto */}
            <section className="bg-black rounded-2xl p-6 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 blur-[50px] rounded-full -mr-10 -mt-10" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-lime-500/20 flex items-center justify-center border border-lime-500/30 text-lime-400">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-white m-0">7. Consultas Legales</h2>
              </div>
              <p className="text-white/60 mb-6 leading-relaxed">
                Para temas relacionados con la protección de datos o auditorías de sistemas, nuestro equipo legal está a tu disposición en:
              </p>
              <div className="inline-block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-lime-500/50 transition-colors">
                <a href="mailto:go@godreamai.com" className="text-lime-400 text-xl font-bold hover:underline tracking-tight">go@godreamai.com</a>
              </div>
            </section>

            {/* Cambios */}
            <section className="text-center text-foreground/60 text-sm border-t border-foreground/10 pt-8">
              <p>
                Podemos actualizar esta política ocasionalmente. Te notificaremos de cambios significativos
                a través de nuestro sitio web.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}





