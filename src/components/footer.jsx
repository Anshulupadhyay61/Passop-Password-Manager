import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-slate-900 border-slate-700 text-white py-6'>
      
      <div className='flex flex-col items-center justify-center gap-2'>

        {/* PassOP Logo Style */}
        <h1 className='text-2xl font-bold'>
          <span className='text-green-600'>&lt;</span>
          <span className='text-white'>Pass</span>
          <span className='text-green-500'>OP/&gt;</span>
        </h1>

        {/* Created By */}
        <p className='text-slate-400 text-sm tracking-wide'>
          Created with ❤️ by 
          <span className='text-green-400 font-semibold'> Anshul Upadhyay</span>
        </p>

        {/* Small tagline */}
        <p className='text-slate-500 text-xs'>
          Secure • Simple • Smart Password Manager
        </p>

      </div>
    </footer>
  )
}

export default Footer