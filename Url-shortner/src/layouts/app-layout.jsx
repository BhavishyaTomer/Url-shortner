import React from 'react'
import { Outlet } from 'react-router-dom'

const Applayout = () => {
  return (
    <div>
   <main className='min-h-screen container'>
    <Outlet/>
   </main>
    <div className='p-10 text-center bg-green-500 mt-10'>
        Footer
    </div>
    </div>
  )
}

export default Applayout