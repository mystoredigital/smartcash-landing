'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  BoltIcon,
  ShieldCheckIcon,
  ClockIcon,
  EyeIcon,
  UserGroupIcon,
  DevicePhoneMobileIcon,
  BanknotesIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';

const mainFeatures = [
  {
    icon: BoltIcon,
    title: 'Dinero Rapido',
    description: 'Recibe tu efectivo el mismo dia. No tienes que esperar semanas a que el banco procese tu cheque.',
    highlights: [
      'Transferencia en menos de 24 horas',
      'Sin tramites bancarios largos',
      'Proceso 100% digital',
      'Atencion personalizada',
    ],
    color: 'from-teal-400 to-teal-600',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Seguro y Confiable',
    description: 'Tu informacion y operaciones protegidas. Cada transaccion queda registrada con total transparencia.',
    highlights: [
      'Registro de cada operacion',
      'Comisiones claras desde el inicio',
      'Pagares digitales como respaldo',
      'Historial completo de movimientos',
    ],
    color: 'from-primary to-teal-500',
  },
  {
    icon: EyeIcon,
    title: 'Seguimiento en Linea',
    description: 'Consulta el estado de tus operaciones en cualquier momento desde tu celular o computadora.',
    highlights: [
      'Portal de cliente exclusivo',
      'Estado en tiempo real de tus cheques',
      'Notificaciones de cada cambio',
      'Acceso desde cualquier dispositivo',
    ],
    color: 'from-teal-600 to-primary-dark',
  },
];

const additionalFeatures = [
  {
    icon: ClockIcon,
    title: 'Sin Esperas',
    description: 'Olvida los 30, 60 o 90 dias. Tu dinero lo necesitas hoy.',
  },
  {
    icon: DocumentCheckIcon,
    title: 'Solo una Foto',
    description: 'Envias la foto del cheque y la factura. Nosotros hacemos el resto.',
  },
  {
    icon: UserGroupIcon,
    title: 'Atencion Personal',
    description: 'Un equipo dedicado a atenderte y resolver tus dudas.',
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Desde tu Celular',
    description: 'Opera desde cualquier lugar, cuando lo necesites.',
  },
];

export function Features() {
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
      id="features"
      className="py-24 bg-gradient-to-b from-dark-900 to-dark-950"
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
              <BanknotesIcon className="w-4 h-4 mr-2" />
              Por que SmartCash
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
              La Forma Mas <span className="text-teal-gradient">Inteligente</span>{' '}
              de Cobrar
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Mientras otros esperan, tu{' '}
              <span className="text-teal-400 font-semibold">ya tienes tu dinero trabajando</span>
            </p>
          </motion.div>

          {/* Main features grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                <div className="card-premium h-full space-y-6 relative overflow-hidden">
                  {/* Icon with gradient background */}
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-teal-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-3">
                    {feature.highlights.map((highlight, hIndex) => (
                      <div key={hIndex} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hover effect gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional features */}
          <motion.div variants={itemVariants} className="space-y-12">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Pensado para que{' '}
                <span className="text-teal-gradient">Tu Ganes</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center space-y-4 p-6 rounded-xl bg-dark-800/30 border border-teal-500/10 hover:border-teal-500/30 transition-colors"
                >
                  <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center mx-auto">
                    <feature.icon className="w-6 h-6 text-teal-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
