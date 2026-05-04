import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FileText, Calendar, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Términos de Servicio',
  description: 'Términos y condiciones de uso de Go Dream Ai.',
}

export default function TerminosPage() {
  const lastUpdated = '3 de diciembre de 2024'

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full text-sm font-semibold text-foreground/70 mb-4">
              <FileText className="w-4 h-4" />
              DOCUMENTO LEGAL
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Términos de <span className="text-gradient">Servicio</span>
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
                Al acceder y utilizar el sitio web <strong>godreamai.com</strong> y los servicios de <strong>Go Dream Ai</strong>,
                aceptás estos términos y condiciones. Si no estás de acuerdo, te pedimos que no utilices nuestros servicios.
              </p>
            </section>

            {/* Sección 1 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Servicios</h2>
              <div className="space-y-4 text-foreground/80">
                <p>Go Dream AI es un estudio especializado en:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Diseño de Arquitectura Operativa:</strong> Creación de infraestructuras lógicas para negocios.</li>
                  <li><strong>Sistemas de Automatización Estructural:</strong> Implementación de flujos de trabajo automáticos que reemplazan tareas manuales.</li>
                  <li><strong>Consultoría de Eficiencia Core:</strong> Auditoría de procesos internos y eliminación de fricción operativa.</li>
                </ul>
                <p>
                  Los detalles exactos de cada implementación se rigen por la propuesta comercial técnica firmada con cada cliente.
                </p>
              </div>
            </section>

            {/* Sección 2 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Uso del sitio y los sistemas</h2>
              <div className="space-y-4 text-foreground/80">
                <p>Al interactuar con nuestra plataforma o contratar nuestros servicios, el cliente se compromete a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Proporcionar acceso veraz a las fuentes de datos necesarias para la automatización.</li>
                  <li>No utilizar la infraestructura diseñada para fines ilícitos o que violen términos de terceros (ej: spam, scraping no autorizado).</li>
                  <li>Mantener la confidencialidad de las credenciales de los sistemas entregados.</li>
                </ul>
              </div>
            </section>

            {/* Sección 3 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Propiedad Intelectual y Confidencialidad</h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  <strong>Metodología GDAI:</strong> Toda la lógica de arquitectura, scripts de automatización maestros y metodologías de diseño son propiedad intelectual exclusiva de Go Dream AI. El cliente recibe una licencia de uso perpetua para su negocio, pero no puede comercializar ni replicar la arquitectura para terceros.
                </p>
                <p>
                  <strong>Confidencialidad:</strong> Ambas partes se comprometen a proteger la información sensible. Go Dream AI no divulgará la lógica de negocio ni los datos internos del cliente a terceros bajo ninguna circunstancia.
                </p>
              </div>
            </section>

            {/* Sección 4 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitación de Responsabilidad</h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  <strong>Errores de Lógica en Automatización:</strong> El cliente dispone de un periodo de auditoría de 14 días tras la entrega para validar la lógica de los sistemas. Go Dream AI no se hace responsable por pérdidas económicas, errores de facturación o fallos operativos directos o indirectos derivados del uso de los sistemas automatizados una vez aprobados.
                </p>
                <p>
                  <strong>Dependencia de Proveedores Externos:</strong> Nuestros sistemas operan sobre infraestructura de terceros (n8n, OpenAI, Google, Vercel, etc.). Go Dream AI no garantiza la disponibilidad del servicio ante caídas globales o cambios abruptos en las APIs de estos proveedores.
                </p>
              </div>
            </section>

            {/* Sección 5 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Pagos y Sprints</h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  Los servicios se ejecutan bajo la modalidad de Sprints de 10-14 días.
                  Los pagos se dividen generalmente en un depósito de inicio y un saldo final tras la validación de la arquitectura.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Los cargos de APIs de terceros (ej: suscripciones de n8n o consumo de OpenAI) corren por cuenta exclusiva del cliente.</li>
                  <li>La falta de pago puede derivar en la suspensión técnica de las automatizaciones conectadas a nuestros servidores.</li>
                </ul>
              </div>
            </section>

            {/* Sección 6 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Cancelaciones</h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  Dada la naturaleza personalizada de la arquitectura de software, una vez iniciado el Sprint de desarrollo no se realizan reembolsos, ya que se está facturando tiempo de ingeniería y diseño estructural.
                </p>
              </div>
            </section>

            {/* Sección 7 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Modificaciones</h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  Podemos actualizar estos términos para reflejar avances tecnológicos o cambios en la arquitectura operativa de nuestros servicios.
                </p>
              </div>
            </section>

            {/* Sección 8 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Ley Aplicable</h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  Estos términos se rigen por las leyes de la República Argentina. Cualquier disputa se someterá a los tribunales ordinarios de la Ciudad de Buenos Aires o Rosario.
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
                <h2 className="text-2xl font-bold text-white m-0">9. Consultas</h2>
              </div>
              <p className="text-white/60 mb-6 leading-relaxed">
                Para cualquier duda sobre estos términos o el servicio de arquitectura operativa:
              </p>
              <div className="inline-block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-lime-500/50 transition-colors">
                <a href="mailto:go@godreamai.com" className="text-lime-400 text-xl font-bold hover:underline tracking-tight">go@godreamai.com</a>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}





