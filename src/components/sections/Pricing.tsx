'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckIcon, SparklesIcon, CalculatorIcon } from '@heroicons/react/24/outline';
import { scrollToElement } from '@/lib/utils';
import { trackEvent } from '@/lib/fbpixel';

const transparencyPoints = [
  'Te mostramos la comision exacta antes de cerrar',
  'Sin cargos ocultos ni letra pequena',
  'La tasa se calcula segun el plazo del cheque',
  'Recibes un pagare digital como respaldo',
  'Puedes consultar el estado de tu operacion en linea',
  'Historial completo de todas tus transacciones',
];

export function Pricing() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section
      id="pricing"
      className="py-24 bg-gradient-to-b from-dark-900 to-dark-950"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium">
              <SparklesIcon className="w-4 h-4 mr-2" />
              Transparencia Total
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
              Sabes Exactamente{' '}
              <span className="text-teal-gradient">Cuanto Recibes</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nada de sorpresas. Te mostramos los numeros claros antes de que tomes la decision.
            </p>
          </motion.div>

          {/* How it works financially */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <div className="bg-dark-800/80 border border-teal-500/30 rounded-2xl p-8 sm:p-12 space-y-8">
              {/* Example */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center space-x-3">
                  <CalculatorIcon className="w-8 h-8 text-teal-400" />
                  <h3 className="text-2xl font-display font-bold text-white">
                    Ejemplo de Operacion
                  </h3>
                </div>
                <p className="text-gray-400">Asi de claro es operar con SmartCash</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="bg-dark-900/50 rounded-xl p-6 border border-teal-500/10">
                  <p className="text-gray-400 text-sm mb-2">Valor del Cheque</p>
                  <p className="text-3xl font-bold text-white">$600</p>
                  <p className="text-gray-500 text-xs mt-1">Plazo: 30 dias</p>
                </div>
                <div className="bg-dark-900/50 rounded-xl p-6 border border-teal-500/10">
                  <p className="text-gray-400 text-sm mb-2">Comision SmartCash</p>
                  <p className="text-3xl font-bold text-teal-400">Transparente</p>
                  <p className="text-gray-500 text-xs mt-1">Calculada segun plazo</p>
                </div>
                <div className="bg-teal-500/10 rounded-xl p-6 border border-teal-500/30">
                  <p className="text-teal-400 text-sm mb-2 font-semibold">Tu Recibes</p>
                  <p className="text-3xl font-bold text-teal-400">Hoy Mismo</p>
                  <p className="text-gray-500 text-xs mt-1">Directo a tu cuenta</p>
                </div>
              </div>

              {/* Transparency points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {transparencyPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckIcon className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{point}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center pt-4">
                <motion.button
                  onClick={() => { trackEvent('Schedule', { content_name: 'Pricing - Cotizar' }); scrollToElement('contact'); }}
                  className="btn-primary text-lg px-10 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cotizar Mi Cheque
                </motion.button>
                <p className="text-gray-500 text-sm mt-4">
                  Sin compromiso. Te damos la cotizacion y tu decides.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
