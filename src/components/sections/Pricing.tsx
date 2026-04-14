'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { scrollToElement } from '@/lib/utils';
import { trackCustomEvent } from '@/lib/fbpixel';

const plans = [
  {
    name: 'Basico',
    description: 'Ideal para operaciones de factoring pequenas que inician su digitalizacion',
    features: [
      'Hasta 50 clientes',
      'Dashboard basico',
      'Gestion de movimientos',
      'Pagares digitales',
      'Soporte por email',
      'Setup en 3 dias',
    ],
    highlighted: false,
  },
  {
    name: 'Profesional',
    description: 'Para empresas de factoring en crecimiento que necesitan control total',
    features: [
      'Clientes ilimitados',
      'Dashboard completo con analitica',
      'Reportes avanzados',
      'Portal de clientes',
      'App movil incluida',
      'Firma electronica de pagares',
      'Soporte prioritario',
      'Setup en 5 dias',
    ],
    highlighted: true,
  },
  {
    name: 'Empresarial',
    description: 'Solucion completa para operaciones de factoring de gran escala',
    features: [
      'Todo lo del plan Profesional',
      'Multi-sucursal',
      'API de integracion',
      'Integraciones personalizadas',
      'Soporte dedicado 24/7',
      'Implementacion a medida',
      'Capacitacion del equipo',
      'Consultor asignado',
    ],
    highlighted: false,
  },
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
              Planes Flexibles
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
              Elige tu <span className="text-teal-gradient">Plan Ideal</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Soluciones que se adaptan al tamano de tu operacion de factoring
            </p>
          </motion.div>

          {/* Plans grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative group rounded-2xl p-8 space-y-6 border transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-dark-800/80 border-teal-500/50 shadow-lg shadow-teal-500/10'
                    : 'bg-dark-800/30 border-teal-500/10 hover:border-teal-500/30'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-teal-gradient text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      Mas Popular
                    </div>
                  </div>
                )}

                {/* Plan name */}
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold text-white">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-400">{plan.description}</p>
                </div>

                {/* Price CTA */}
                <div className="py-4">
                  <span className="text-2xl font-bold text-teal-400">Cotizacion Personalizada</span>
                  <p className="text-gray-500 text-sm mt-1">Segun volumen de operaciones</p>
                </div>

                {/* Features */}
                <div className="space-y-3 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <CheckIcon className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  onClick={() => { trackCustomEvent('PlanSelected', { plan_name: plan.name }); scrollToElement('contact'); }}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? 'btn-primary'
                      : 'bg-dark-700 text-white border border-teal-500/20 hover:border-teal-500/50 hover:bg-dark-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Solicitar Cotizacion
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Note */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-gray-400 text-sm">
              Todos los planes incluyen demo gratuita y soporte de implementacion.
              Los precios se ajustan segun el volumen de operaciones.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
