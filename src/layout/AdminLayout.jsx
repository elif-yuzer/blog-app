import React from 'react'
import { Outlet } from 'react-router-dom'
const AdminLayout = () => {
  return (
      <div className="flex min-h-screen">
      <aside className="w-64 bg-base-200 p-4">
        <p className="font-bold text-lg mb-4">Admin Panel</p>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout