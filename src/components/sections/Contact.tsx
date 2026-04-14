'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { ContactForm } from '@/components/ui/ContactForm';

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@smartcash.ec';
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+593 99 000 0000';

  return (
    <section id="contact" className="py-24 bg-dark-950 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Convierte tu Cheque en{' '}
            <span className="text-teal-gradient">Efectivo Hoy</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Dejanos tus datos y te contactamos para darte una cotizacion
            personalizada. Sin compromiso.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass p-8 rounded-2xl"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Quiero Cobrar Mi Cheque
                </h3>
                <p className="text-gray-400">
                  Completa tus datos y te contactamos en menos de 24 horas
                </p>
              </div>

              <ContactForm />
            </motion.div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass p-6 rounded-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-6">
                Contacto Directo
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-teal-gradient rounded-lg flex items-center justify-center">
                    <EnvelopeIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">{contactEmail}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-teal-gradient rounded-lg flex items-center justify-center">
                    <PhoneIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">WhatsApp</p>
                    <p className="text-white">{contactPhone}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass p-6 rounded-2xl"
            >
              <h4 className="text-lg font-semibold text-white mb-4">
                Por que Confiar en Nosotros
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full" />
                  <span className="text-gray-300">Respuesta en menos de 24 horas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full" />
                  <span className="text-gray-300">Comisiones claras desde el inicio</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full" />
                  <span className="text-gray-300">Pagare digital como respaldo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full" />
                  <span className="text-gray-300">Portal para consultar tus operaciones</span>
                </div>
              </div>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="glass p-6 rounded-2xl text-center"
            >
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-teal-500">Hoy</div>
                  <div className="text-gray-400 text-sm">Recibes tu dinero</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-500">100%</div>
                  <div className="text-gray-400 text-sm">Transparente</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-500">Ecuador</div>
                  <div className="text-gray-400 text-sm">Servicio local</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
