import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../components/Admin/Navbar'

export default function AdminLayout() {
  return (
    <div>
      <AdminNavbar />
    <div className='min-h-96'>
    <Outlet/>
    </div>

</div>
  )
}
