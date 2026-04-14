'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PlayIcon, ClockIcon, UserPlusIcon, DocumentArrowUpIcon, CalculatorIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import { trackEvent } from '@/lib/fbpixel';

const processSteps = [
  {
    icon: UserPlusIcon,
    title: 'Registra tu Empresa',
    description: 'Crea tu cuenta, valida tu RUC y configura tu perfil de factoring en minutos.',
    duration: '5 min',
  },
  {
    icon: DocumentArrowUpIcon,
    title: 'Carga tus Documentos',
    description: 'Sube facturas, cheques y documentos de respaldo. Todo digital, cero papeleo.',
    duration: 'Inmediato',
  },
  {
    icon: CalculatorIcon,
    title: 'Recibe tu Liquidacion',
    description: 'El sistema calcula automaticamente comisiones, plazos y montos de liquidacion.',
    duration: 'Automatico',
  },
  {
    icon: BanknotesIcon,
    title: 'Cobra tu Efectivo',
    description: 'Recibe tu dinero mientras SmartCash gestiona el cobro y seguimiento completo.',
    duration: 'Al instante',
  },
];

export function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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
      id="how-it-works"
      className="py-24 bg-gradient-to-b from-dark-950 to-dark-900"
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
              <PlayIcon className="w-4 h-4 mr-2" />
              Proceso Simple y Rapido
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
              Como <span className="text-teal-gradient">Funciona</span> SmartCash
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              De la factura al efectivo en{' '}
              <span className="text-teal-400 font-semibold">4 pasos simples</span>.{' '}
              Sin complicaciones, sin papeleo, sin esperas.
            </p>
          </motion.div>

          {/* Process steps */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className="card-premium text-center space-y-6 relative">
                    {/* Step number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-teal-gradient rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center pt-4">
                      <div className="w-16 h-16 bg-teal-500/10 rounded-xl flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-teal-400" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h4 className="text-xl font-display font-semibold text-white">
                        {step.title}
                      </h4>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {step.description}
                      </p>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-sm">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {step.duration}
                      </div>
                    </div>
                  </div>

                  {/* Connection line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-teal-500 to-transparent transform -translate-y-1/2" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to action */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-dark-800/50 border border-teal-500/20 rounded-2xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Listo para <span className="text-teal-gradient">Digitalizar</span> tu Factoring?
              </h3>
              <p className="text-gray-300 mb-6">
                Solicita una demo personalizada y descubre como SmartCash puede
                transformar tus operaciones de factoring
              </p>
              <motion.button
                onClick={() => { trackEvent('Schedule', { content_name: 'HowItWorks - Demo' }); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Solicitar Demo Gratuita
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
