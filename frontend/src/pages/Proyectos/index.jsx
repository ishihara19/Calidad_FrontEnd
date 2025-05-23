import React, { useEffect, useState } from 'react';
import { fetchProyectos } from '../../api/proyectos';
import ProyectoCard from '../../components/ProyectoCard';

export default function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProyectos()
      .then((res) => setProyectos(res.data))
      .catch((err) => setError(err.message || 'Error al cargar proyectos'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mis Proyectos</h1>
      {proyectos.length === 0 ? (
        <p>No tienes proyectos aún.</p>
      ) : (
        proyectos.map((p) => <ProyectoCard key={p.id} proyecto={p} />)
      )}
    </div>
  );
}
