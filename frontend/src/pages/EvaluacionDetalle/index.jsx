import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEvaluacionResultados } from '../../api/proyectos';

export default function EvaluacionDetalle() {
  const { id } = useParams();
  const [resultados, setResultados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvaluacionResultados(id)
      .then((res) => setResultados(res.data))
      .catch((err) => setError(err.message || 'Error al cargar resultados'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando evaluación...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!resultados) return <p>No hay datos para esta evaluación.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Evaluación: {resultados.proyecto}</h1>
      <p>Estado: {resultados.estado}</p>
      <p>
        Porcentaje total: {resultados.porcentaje_total.toFixed(2)}% - Nivel:{' '}
        {['No cumple', 'Cumple parcialmente', 'Cumple mayormente', 'Cumple totalmente'][resultados.nivel_cumplimiento]}
      </p>

      <h2 className="text-2xl mt-6 mb-3">Resultados por Característica</h2>
      {resultados.resultados.map((caract) => (
        <div
          key={caract.caracteristica.codigo}
          className="border p-4 rounded mb-4 shadow-sm"
        >
          <h3 className="font-semibold">
            {caract.caracteristica.codigo} - {caract.caracteristica.nombre}
          </h3>
          <p>Porcentaje cumplimiento: {caract.porcentaje_cumplimiento}%</p>
          <p>
            Nivel: {['No cumple', 'Cumple parcialmente', 'Cumple mayormente', 'Cumple totalmente'][caract.nivel_cumplimiento]}
          </p>

          {caract.subcaracteristicas.map((sub) => (
            <div key={sub.id} className="ml-4 mt-3">
              <h4 className="font-medium">
                {sub.codigo} - {sub.nombre}
              </h4>
              <ul className="list-disc ml-6">
                {sub.preguntas.map((preg) => (
                  <li key={preg.id}>
                    {preg.codigo} - {preg.texto} :{' '}
                    {preg.respuesta
                      ? `Valor: ${preg.respuesta.valor}` +
                        (preg.respuesta.observacion ? `, Obs: ${preg.respuesta.observacion}` : '')
                      : 'Sin responder'}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
