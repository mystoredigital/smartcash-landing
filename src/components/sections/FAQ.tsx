'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDownIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'Como funciona el servicio de SmartCash?',
    answer:
      'Es muy simple: tu nos envias la foto de tu cheque junto con la factura correspondiente. Nosotros revisamos la informacion, te hacemos una oferta con la comision detallada, y si aceptas, te transferimos el dinero a tu cuenta el mismo dia. Nosotros nos encargamos de cobrar el cheque cuando venza.',
  },
  {
    question: 'Que necesito para empezar?',
    answer:
      'Solo necesitas tener un cheque por cobrar y una factura que respalde la operacion. Nos envias una foto legible del cheque, los datos de tu empresa y listo. El primer registro es rapido y para las siguientes operaciones el proceso es aun mas agil.',
  },
  {
    question: 'Cuanto cobran de comision?',
    answer:
      'La comision se calcula de forma transparente segun el monto y el plazo del cheque. Antes de cerrar cualquier operacion, te mostramos exactamente cuanto recibes y cuanto es la comision. Sin cargos ocultos, sin sorpresas.',
  },
  {
    question: 'Cuanto tiempo tarda en llegarme el dinero?',
    answer:
      'Una vez que aceptas la oferta, el dinero se transfiere a tu cuenta en menos de 24 horas. En la mayoria de los casos, el mismo dia.',
  },
  {
    question: 'Que tipo de cheques aceptan?',
    answer:
      'Aceptamos cheques de los principales bancos de Ecuador. Cada cheque debe estar vinculado a una factura especifica, ya que cada factura representa una negociacion independiente.',
  },
  {
    question: 'Es seguro operar con SmartCash?',
    answer:
      'Absolutamente. Cada operacion genera un pagare digital como respaldo. Toda tu informacion esta protegida con encriptacion de grado empresarial. Ademas, puedes consultar el estado de tus operaciones en cualquier momento desde tu portal de cliente.',
  },
  {
    question: 'Puedo hacer operaciones recurrentes?',
    answer:
      'Si, y es lo que recomendamos. Los clientes recurrentes obtienen mejores condiciones y un proceso mas agil. Mientras mas operes con nosotros, mejor te conocemos y mas rapido procesamos tus solicitudes.',
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
              Todo lo que necesitas saber antes de convertir tus cheques en efectivo
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
