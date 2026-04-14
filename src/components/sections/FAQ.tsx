'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDownIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'Que es el factoring y como funciona SmartCash?',
    answer:
      'El factoring es una herramienta financiera que permite convertir facturas o cheques por cobrar en efectivo inmediato. SmartCash digitaliza todo este proceso: desde la carga de documentos hasta el calculo automatico de comisiones, generacion de pagares y seguimiento del cobro.',
  },
  {
    question: 'Que documentos necesito para comenzar?',
    answer:
      'Solo necesitas tu RUC empresarial, los datos de tu representante legal y los documentos de las operaciones (facturas, cheques). SmartCash valida tu RUC automaticamente y te guia en cada paso de la configuracion.',
  },
  {
    question: 'Como se calculan las comisiones y tasas?',
    answer:
      'SmartCash calcula automaticamente las comisiones basandose en el monto, plazo de cobro y tasa configurada (por defecto 4% / 30 dias). Incluye IVA (15% configurable), capital recuperable y monto neto a transferir. Todo transparente y sin errores.',
  },
  {
    question: 'Es seguro subir mis documentos a la plataforma?',
    answer:
      'Absolutamente. SmartCash utiliza Supabase con encriptacion de grado empresarial, autenticacion segura y politicas de acceso por roles (RLS). Tus datos financieros estan protegidos con los mismos estandares que usan los bancos.',
  },
  {
    question: 'Puedo acceder desde mi celular?',
    answer:
      'Si. SmartCash cuenta con una app movil nativa para iOS y Android que permite operar desde cualquier lugar: fotografiar cheques, crear movimientos, consultar el dashboard y mas. Ademas, la plataforma web es completamente responsive.',
  },
  {
    question: 'Cuanto tiempo toma la implementacion?',
    answer:
      'Dependiendo del plan, la implementacion toma entre 3 y 7 dias. Incluye configuracion del sistema, migracion de datos existentes, capacitacion de tu equipo y soporte durante las primeras operaciones.',
  },
  {
    question: 'Ofrecen soporte tecnico?',
    answer:
      'Si. Todos los planes incluyen soporte tecnico. El plan Basico incluye soporte por email, el Profesional soporte prioritario, y el Empresarial soporte dedicado 24/7 con un consultor asignado a tu cuenta.',
  },
];

function FAQItem({ question, answer, isOpen, onClick }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`border rounded-xl transition-all duration-300 ${
        isOpen
          ? 'border-teal-500/30 bg-dark-800/50'
          : 'border-teal-500/10 hover:border-teal-500/20'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="text-white font-medium pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDownIcon className="w-5 h-5 text-teal-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-300 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section
      id="faq"
      className="py-24 bg-gradient-to-b from-dark-950 to-dark-900"
      ref={ref}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium">
              <QuestionMarkCircleIcon className="w-4 h-4 mr-2" />
              Preguntas Frecuentes
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
              Resolvemos tus <span className="text-teal-gradient">Dudas</span>
            </h2>
            <p className="text-xl text-gray-300">
              Todo lo que necesitas saber sobre SmartCash y el factoring digital
            </p>
          </motion.div>

          {/* FAQ items */}
          <motion.div variants={itemVariants} className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
