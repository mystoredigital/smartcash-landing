'use client';

import { FaInstagram, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-teal-500/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center mb-2">
            <img src="/logo-smartcash.png" alt="SmartCash Logo" className="h-10" />
          </div>
          <p className="text-gray-400">
            Efectivo inmediato por tus cheques · Servicio de factoring confiable en Ecuador
          </p>

          {/* Social media links */}
          <div className="flex justify-center items-center space-x-5">
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark-800 border border-teal-500/20 flex items-center justify-center text-gray-400 hover:text-teal-400 hover:border-teal-500/50 transition-all duration-300">
              <FaInstagram className="w-4 h-4" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark-800 border border-teal-500/20 flex items-center justify-center text-gray-400 hover:text-teal-400 hover:border-teal-500/50 transition-all duration-300">
              <FaLinkedinIn className="w-4 h-4" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark-800 border border-teal-500/20 flex items-center justify-center text-gray-400 hover:text-teal-400 hover:border-teal-500/50 transition-all duration-300">
              <FaFacebookF className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-col items-center space-y-2 text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>&copy; 2026 SmartCash. Todos los derechos reservados.</span>
              <span>&middot;</span>
              <a href="/privacy" className="hover:text-teal-400 transition-colors">
                Politica de Privacidad
              </a>
            </div>
            <p className="text-gray-600">
              Creado por <span className="text-gray-400">My Store Digital LLC</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
