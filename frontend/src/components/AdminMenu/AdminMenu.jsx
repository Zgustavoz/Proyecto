import React, { useState } from 'react';
import './AdminMenu.css';
import UsuariosTable from './../tables/UsuariosTable';
import EmpleadosTable from './../tables/EmpleadosTable';
import ProductosTable from './../tables/ProductosTable';
// Importa los demás componentes de tablas...

function AdminMenu() {
  const [activeTab, setActiveTab] = useState('inicio');

  const renderContent = () => {
    switch(activeTab) {
      case 'usuarios': return <UsuariosTable />;
      case 'empleados': return <EmpleadosTable />;
      case 'productos': return <ProductosTable />;
      // Agrega los demás casos...
      default: return (
        <>
          <h2>Bienvenido al Sistema</h2>
          <p>Seleccione una opción del menú para comenzar.</p>
        </>
      );
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h1>Restaurante</h1>
        
        <div className="menu-section">
          <h2>Menu de Inicio</h2>
          <p>Bienvenido al panel de administrador.</p>
        </div>

        <div className="menu-section">
          <h3>Manual</h3>
          <ul className="menu-items">
            <li>
              <button 
                className={activeTab === 'usuarios' ? 'active' : ''}
                onClick={() => setActiveTab('usuarios')}
              >
                Usuarios
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'empleados' ? 'active' : ''}
                onClick={() => setActiveTab('empleados')}
              >
                Empleados
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'productos' ? 'active' : ''}
                onClick={() => setActiveTab('productos')}
              >
                Productos
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'ClienteWeb' ? 'active' : ''}
                onClick={() => setActiveTab('ClienteWeb')}
              >
                ClienteWeb
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'Proveedor' ? 'active' : ''}
                onClick={() => setActiveTab('Proveedor')}
              >
                Proveedor
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'CambiarContraseña' ? 'active' : ''}
                onClick={() => setActiveTab('CambiarContraseña')}
              >
                Cambiar Contraseña
              </button>
            </li>

            {/* Agrega los demás botones del menú */}
          </ul>
        </div>
      </div>

      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminMenu;