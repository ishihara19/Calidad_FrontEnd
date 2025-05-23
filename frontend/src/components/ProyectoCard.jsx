import React from 'react';
import { Link } from 'react-router-dom';

export default function ProyectoCard({ proyecto }) {
  const primeraEval = proyecto.evaluaciones?.[0];

  return (
    <div className="border rounded p-4 shadow mb-4">
      <h3 className="text-xl font-semibold">{proyecto.nombre}</h3>
      <p className="mb-2">{proyecto.descripcion}</p>
      <p>
        <strong>Porcentaje cumplimiento:</strong>{' '}
        {primeraEval ? primeraEval.porcentaje_total.toFixed(2) + '%' : 'Sin evaluaciones'}
      </p>
      {primeraEval && (
        <Link
          to={`/evaluacion/${primeraEval.id}`}
          className="text-blue-600 underline mt-2 inline-block"
        >
          Ver detalles evaluación
        </Link>
      )}
    </div>
  );
}
