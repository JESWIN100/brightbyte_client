import React from 'react'
import Header from '../components/user/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/user/Footer'

export default function 
() {
  return (
    <div>
        <Header/>
        <div className='min-h-96'>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}
