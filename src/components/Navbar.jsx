import React, { useState } from 'react'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdCloseFullscreen } from "react-icons/md";



function Navbar() {
    const [menu, setMenu] = useState(false)
    const items = [
        {id: 1, text: 'About'},
        {id: 2, text: 'Services'},
        {id: 3, text: 'Work'},
        {id: 4, text: 'Contact', to: 'about'}
    ]
  return (
    <div>
        <div className="container mx-auto hidden md:flex justify-between items-center py-6">
            <div className="text-xl lg:text-2xl font-bold flex items-center gap-1">
                <span className='text-white'>Iron</span>
                <span className='text-purple-500'>Coding</span>
            </div>
            <div className="abot">
                <ul className='hidden md:flex items-center space-x-6 list-none lg:text-lg md:text-base text-white'>
                    { items.map(({id, text}) => (
                        <li key={id}>{text}</li>
                    ))}
                </ul>
            </div>
            <a className='md:text-base lg:text-lg bg-purple-500 hover:bg-purple-400 text-white px-4 py-2 rounded-full'>Download CV</a>
        </div>
        <div className='flex md:hidden justify-between'>
            <div>
                <div 
                onClick={() => setMenu((prev) => !prev )}
                className='bg-white 2-2/3 h-screen text-black fixed x-10'>
                    <div className='px-7 py-6'>
                        {
                            menu ? (<HiOutlineMenuAlt3/>) : <MdCloseFullscreen/>
                        }
                    {/* <HiOutlineMenuAlt3 />
                    <MdCloseFullscreen /> */}
                    </div>
                    { menu && (
                        <div>
                            <ul>
                            { items.map(({id, text}) => (
                                <li key={id}>{text}</li>
                                  ))}
                    
 
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Navbar