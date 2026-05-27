import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-24">

        <div className='logo font-bold text-white text-2xl'>
          <span className='text-green-700'> &lt; </span>

          <span>Pass</span>
          <span className='text-green-700'>OP/ &gt; </span>

        </div>
        {/* <ul>
          <li className='flex gap-4'>
            <a className='hover:font-bold' href="#">home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
          </li>
        </ul> */}
        <button className='flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-full shadow-lg border border-slate-600 transition-all duration-300 hover:scale-105'>

          <img
            className='w-5 h-5 invert'
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="github logo"
          />

          GitHub

        </button>

      </div>
    </nav>
  )
}

export default Navbar
