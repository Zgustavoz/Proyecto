import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../Shared/TableStyles.css';

function EmpleadosTable() {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/empleados');
        setEmpleados(response.data);
      } catch (error) {
        console.error('Error al cargar empleados:', error);
        setError('Error al cargar empleados');     
      } finally {
        setLoading(false);
      }
    };

    fetchEmpleados();
  }, []);

  if (loading) return <div>Cargando empleados...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="table-container">
      <h2>Administración de Empleados</h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Tipo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map(empleado => (
              <tr key={empleado.id}>
                <td>{empleado.id}</td>
                <td>{empleado.nombre}</td>
                <td>{empleado.ci}</td>
                <td>{empleado.correo || 'N/A'}</td>
                <td>{empleado.telefono || 'N/A'}</td>
                <td>{empleado.tipoUsuario}</td>
                <td>{empleado.rolNombre}</td>
                <td>{empleado.estadoDescripcion}</td>
                <td>
                  <button className="btn-editar">Editar</button>
                  <button className="btn-eliminar">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmpleadosTable;