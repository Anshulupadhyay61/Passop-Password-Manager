import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/footer'

function App() {

  return (
    <div className='min-h-screen flex flex-col [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]'>

      <Navbar />

      <main className='flex-grow'>
        <Manager />
      </main>

      <Footer />

    </div>
  )
}

export default App