'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  DocumentMinusIcon,
  CalculatorIcon,
  EyeIcon,
  ShieldCheckIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';
import { trackEvent } from '@/lib/fbpixel';

const benefits = [
  {
    icon: DocumentMinusIcon,
    title: 'Elimina el Papeleo',
    description: 'Todo digital: facturas, cheques, pagares y comprobantes. Adjunta fotos desde tu celular y olvida el papel.',
  },
  {
    icon: CalculatorIcon,
    title: 'Reduce Errores de Calculo',
    description: 'Comisiones, IVA, plazos de cobro y liquidaciones calculadas automaticamente. Cero errores humanos.',
  },
  {
    icon: EyeIcon,
    title: 'Transparencia Total',
    description: 'Tus clientes rastrean sus operaciones en el portal publico. 6 estados de seguimiento en tiempo real.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Cumplimiento Normativo',
    description: 'Validacion de RUC, dias habiles ecuatorianos, feriados nacionales y firma electronica de pagares.',
  },
];

const stats = [
  { value: '99.9%', label: 'Uptime' },
  { value: '< 5 min', label: 'Por liquidacion' },
  { value: '6', label: 'Estados de seguimiento' },
  { value: '100%', label: 'Digital' },
];

export function Benefits() {
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
      id="benefits"
      className="py-24 bg-gradient-to-b from-dark-950 to-dark-900"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-20"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium">
              <BoltIcon className="w-4 h-4 mr-2" />
              Ventajas Comprobadas
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
              Por que Elegir{' '}
              <span className="text-teal-gradient">SmartCash</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Deja atras los procesos manuales y las hojas de calculo.{' '}
              <span className="text-teal-400 font-semibold">Automatiza tu factoring</span>{' '}
              con la tecnologia que tu negocio merece.
            </p>
          </motion.div>

          {/* Benefits grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card-premium flex items-start space-x-6"
              >
                <div className="w-14 h-14 bg-teal-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-7 h-7 text-teal-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-dark-800/50 border border-teal-500/20 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-display font-bold text-white mb-8">
                <span className="text-teal-gradient">Numeros</span> que Hablan por Si Solos
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="text-3xl font-bold text-teal-400">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h3 className="text-3xl font-display font-bold text-white">
                Listo para <span className="text-teal-gradient">Modernizar</span> tu Factoring?
              </h3>
              <p className="text-lg text-gray-300">
                Descubre como SmartCash puede darte el control total de tus
                operaciones con una plataforma 100% digital
              </p>
              <motion.button
                onClick={() => { trackEvent('Schedule', { content_name: 'Benefits - Demo' }); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-primary text-lg px-12 py-5 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Empezar Ahora
                <BoltIcon className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform inline" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
