import React, { useState } from 'react'
import './AdminMenu.css'
import UsuariosTable from './../tables/UsuariosTable'
import EmpleadosTable from './../tables/EmpleadosTable'
import ProductosTable from './../tables/ProductosTable'
import SideBar from '../SideBar/SideBar.jsx'
// Importa los demás componentes de tablas...

function AdminMenu() {
  const [activeTab, setActiveTab] = useState('inicio')

  const renderContent = () => {
    switch (activeTab) {
      case 'usuarios':
        return <UsuariosTable />
      case 'empleados':
        return <EmpleadosTable />
      case 'productos':
        return <ProductosTable />
      // Agrega los demás casos...
      default:
        return (
          <>
            <h2>Bienvenido al Sistema</h2>
            <p>Seleccione una opción del menú para comenzar.</p>
          </>
        )
    }
  }

  return (
    <div className='flex md:flex-row flex-col'>
      <SideBar setActiveTab={setActiveTab} />
      <div className='main-content'>{renderContent()}</div>
    </div>
  )
}

export default AdminMenu
