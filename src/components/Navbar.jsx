import React from 'react'

function Navbar() {
  return (
    <div>
        <div className="container mx-auto hidden md:flex justify-between items-center py-6">
            <div className="text-xl lg:text-2xl font-bold flex items-center gap-1">
                <span className='text-white bg-red-400'>Iron</span>
                <span className='text-purple-500'>Coding</span>
            </div>
            <div className="abot">
                <ul className='hidden md:flex items-center space-x-6 list-none lg:text-lg md:text-base text-white'>
                    <li>About</li>
                    <li>Services</li>
                    <li>Work</li>
                    <li>Contact</li>
                </ul>
            </div>
            <a>Download CV</a>
        </div>
    </div>
  )
}

export default Navbar