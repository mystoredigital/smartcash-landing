import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politica de Privacidad - SmartCash',
  description: 'Politica de privacidad de SmartCash, sistema de factoring digital para Ecuador.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-dark-950 text-gray-300 py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Politica de Privacidad</h1>
        <p className="text-gray-400 mb-8">Ultima actualizacion: Abril 2026</p>

        <div className="space-y-8 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Informacion que Recopilamos</h2>
            <p>
              En SmartCash recopilamos informacion personal que usted nos proporciona voluntariamente
              a traves de nuestro formulario de contacto, incluyendo: nombre, email, telefono,
              nombre de empresa, RUC y descripcion de su operacion de factoring.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Uso de la Informacion</h2>
            <p>
              Utilizamos su informacion para: contactarlo respecto a nuestros servicios,
              personalizar su experiencia, mejorar nuestro sitio web y enviar comunicaciones
              comerciales relacionadas con nuestros productos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Proteccion de Datos</h2>
            <p>
              Implementamos medidas de seguridad tecnicas y organizativas para proteger su
              informacion personal contra acceso no autorizado, alteracion, divulgacion o
              destruccion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Cookies y Tecnologias de Seguimiento</h2>
            <p>
              Nuestro sitio utiliza cookies y tecnologias similares, incluyendo Facebook Pixel,
              para analizar el trafico web y mejorar la experiencia del usuario. Puede configurar
              su navegador para rechazar cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Derechos del Usuario</h2>
            <p>
              Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento
              de sus datos personales. Para ejercer estos derechos, contactenos a traves de
              nuestro formulario de contacto o email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Contacto</h2>
            <p>
              Si tiene preguntas sobre esta politica de privacidad, puede contactarnos a traves
              de nuestro formulario de contacto en la pagina principal.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-teal-500/20">
          <a href="/" className="text-teal-400 hover:text-teal-300 transition-colors">
            &larr; Volver al inicio
          </a>
        </div>
      </div>
    </main>
  );
}
