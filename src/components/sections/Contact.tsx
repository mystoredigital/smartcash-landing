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

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@smartcash.com';
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
            Digitaliza tu Factoring{' '}
            <span className="text-teal-gradient">Hoy</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Completa el formulario y obtén una demo personalizada de SmartCash.
            Te mostramos cómo transformar tus operaciones de factoring.
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
                  Solicita tu Demo Gratuita
                </h3>
                <p className="text-gray-400">
                  Completa los datos y te contactaremos en menos de 24 horas
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
                Garantias
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full" />
                  <span className="text-gray-300">Respuesta en 24hrs garantizada</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full" />
                  <span className="text-gray-300">Demo personalizada gratuita</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full" />
                  <span className="text-gray-300">Sin compromiso de compra</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full" />
                  <span className="text-gray-300">Soporte de implementacion incluido</span>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="glass p-6 rounded-2xl text-center"
            >
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-teal-500">100%</div>
                  <div className="text-gray-400 text-sm">Digital</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-500">Ecuador</div>
                  <div className="text-gray-400 text-sm">Hecho para ti</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-500">24/7</div>
                  <div className="text-gray-400 text-sm">Disponibilidad</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
