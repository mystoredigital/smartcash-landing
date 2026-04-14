'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, ExclamationCircleIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { trackEvent } from '@/lib/fbpixel';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  chequeAmount: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const amountOptions = [
  { value: '$300 - $500', label: '$300 - $500' },
  { value: '$500 - $1,000', label: '$500 - $1,000' },
  { value: '$1,000 - $2,000', label: '$1,000 - $2,000' },
  { value: '$2,000 - $3,000', label: '$2,000 - $3,000' },
  { value: '$3,000 - $4,000', label: '$3,000 - $4,000' },
];

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    chequeAmount: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El telefono es requerido';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'La empresa es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    trackEvent('InitiateCheckout', { content_name: 'Demo SmartCash' });

    try {
      const apiKey = process.env.NEXT_PUBLIC_GHL_API_KEY;
      const locationId = process.env.NEXT_PUBLIC_GHL_LOCATION_ID;

      if (apiKey) {
        // Separar nombre y apellido
        const nameParts = formData.name.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        await fetch('https://rest.gohighlevel.com/v1/contacts/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email: formData.email,
            phone: formData.phone,
            companyName: formData.company,
            locationId,
            source: 'SmartCash Landing Page',
            tags: ['smartcash-lead', 'landing-page'],
            customField: {
              monto_cheque: formData.chequeAmount,
              mensaje: formData.message,
            },
          }),
        });
      }

      trackEvent('Lead', {
        content_name: 'Demo SmartCash',
        content_category: 'contact_form',
      });
      trackEvent('CompleteRegistration', {
        content_name: 'Formulario SmartCash',
        status: true,
      });

      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          chequeAmount: '',
          message: '',
        });
      }, 3000);
    } catch (error) {
      console.error('Error sending form data:', error);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', company: '', chequeAmount: '', message: '' });
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const SuccessMessage = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-white mb-2">Mensaje Enviado!</h3>
      <p className="text-gray-300">
        Te contactaremos en las proximas 24 horas para darte una cotizacion personalizada.
      </p>
    </motion.div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <SuccessMessage />
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-dark-800/50 border ${
                    errors.name ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors`}
                  placeholder="Tu nombre completo"
                />
                {errors.name && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {errors.name}
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Corporativo *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-dark-800/50 border ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors`}
                  placeholder="tu@empresa.com"
                />
                {errors.email && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {errors.email}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Company Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Telefono/WhatsApp *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-dark-800/50 border ${
                    errors.phone ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors`}
                  placeholder="+593 99 123 4567"
                />
                {errors.phone && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {errors.phone}
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Empresa *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full bg-dark-800/50 border ${
                    errors.company ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors`}
                  placeholder="Nombre de tu empresa"
                />
                {errors.company && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <ExclamationCircleIcon className="w-4 h-4" />
                    {errors.company}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Cheque Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="chequeAmount" className="block text-sm font-medium text-gray-300 mb-2">
                  Monto Aproximado del Cheque
                </label>
                <select
                  id="chequeAmount"
                  name="chequeAmount"
                  value={formData.chequeAmount}
                  onChange={handleChange}
                  className="w-full bg-dark-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
                >
                  <option value="">Selecciona un rango</option>
                  {amountOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-dark-800">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Cuentanos mas (Opcional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full bg-dark-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors resize-none"
                placeholder="Plazo del cheque, banco, o cualquier detalle adicional..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary py-4 text-lg font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="w-6 h-6" />
                  Quiero Cobrar Mi Cheque
                </>
              )}
            </motion.button>

            {/* Trust indicators */}
            <div className="text-center text-sm text-gray-400 space-y-1">
              <p>Respuesta garantizada en 24 horas</p>
              <p>Cotizacion personalizada sin compromiso</p>
              <p>Tu dinero el mismo dia</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
