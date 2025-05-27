// src/components/PhoneInputCustom.jsx
import React from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { AlertCircle } from "lucide-react";

const PhoneInputCustom = ({ value, onChange, error }) => {
  return (
    <div className="space-y-1">
      <PhoneInput
        country={'co'}
        value={value}
        onChange={onChange}
        inputProps={{
          name: 'phone',
          required: true,
          autoFocus: false,
          className: "w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
        }}
        inputStyle={{
          width: '100%',
          height: '50px', // para aproximar py-3 (12 x 4)
          borderRadius: '0.75rem', // rounded-xl
          border: error ? '1px solid #fca5a5' : '1px solid #d1d5db', // border-red-300 o border-gray-300
          backgroundColor: error ? '#fef2f2' : '#ffffff', // bg-red-50 o blanco
          paddingLeft: '70px', // para dejar espacio para el dropdown (bandera + código)
          fontSize: '1rem', // tamaño texto base
          color: '#374151', // text-gray-700 en Tailwind
          transition: 'all 0.2s ease-in-out',
          boxSizing: 'border-box',
        }}
        buttonStyle={{
          borderRadius: '0.75rem 0 0 0.75rem',
          border: error ? '1px solid #fca5a5' : '1px solid #d1d5db',
          height: '50px',
          padding: '0 12px',
          backgroundColor: error ? '#fef2f2' : '#ffffff', // mismo fondo que el input
          transition: 'all 0.2s ease-in-out',
        }}
        dropdownStyle={{ zIndex: 9999 }}
        disableCountryCode={false}
        countryCodeEditable={false}
        placeholder="Ingresa tu número de teléfono"
      />
      {error && (
        <p className="text-red-600 text-sm flex items-center mt-1">
          <AlertCircle className="h-4 w-4 mr-1" />
          {typeof error === "string" ? error : "Número inválido"}
        </p>
      )}
    </div>
  )
}

export default PhoneInputCustom;
