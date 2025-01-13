import React from 'react'
import { motion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { FaPhone,
        FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram
} from 'react-icons/fa'


const Contact = () => {
  return (
    <div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12'>
            <h2 className='text-4xl font-bold text-white '>Lets Discuss Your <span className='text-purple-500'>Project</span></h2>
            <p className='text-slate-400 mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, dolores! Placeat eius, labore voluptatibus ea et ipsa minima animi! Dolore.</p>
        </div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='space-y-6'>
                <div className='flex items-center space-x-4'>

               
                <div className='bg-purple-500 p-4 rounded-full '>
                    <FaPhone className='text-white w-6 h-6'/>
                </div>
                <div>
                    <p className='text-lg font-medium text-purple-500'>
                        Call me 
                    </p>
                    <p className='text-white'>
                        099877788
                    </p>
                </div>
                </div>
                <div className='flex items-center space-x-4'>

               
                    <div className='bg-purple-500 p-4 rounded-full '>
                        <FaEnvelope className='text-white w-6 h-6'/>
                    </div>
                    <div>
                        <p className='text-lg font-medium text-purple-500'>
                            Email me 
                        </p>
                        <p className='text-white'>
                            barnabmutinhiri@gmail.com
                        </p>
                    </div>
                </div>
                <div className='flex items-center space-x-4'>

               
                <div className='bg-purple-500 p-4 rounded-full '>
                    <FaMapMarkerAlt className='text-white w-6 h-6'/>
                </div>
                <div>
                    <p className='text-lg font-medium text-purple-500'>
                        Address
                    </p>
                    <p className='text-white'>
                        Kadoma zimbabwe
                    </p>
                </div>
                </div>
            </div>
            <form className='space text-white '>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <input type="text" placeholder='Full Name' className='border border-purple-500 bg:gray-900 p-4 rounded-md w-full' />
                    <input type="email" placeholder='Your email' className='border border-purple-500 bg:gray-900 p-4 rounded-md w-full'/>

                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <input type="text" placeholder='Phone Number' className='border border-purple-500 bg:gray-900 p-4 rounded-md w-full' />
                    <input type="email" placeholder='Budget' className='border border-purple-500 bg:gray-900 p-4 rounded-md w-full'/>

                </div>
                <textarea name="say" placeholder='Message' id="" className='border border-purple-500 bg:gray-900 p-4 rounded-md w-full'></textarea>
                <button type='submit'className='bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600 transition duration-200'>Submit Message</button>
            </form>
        </div>
        {/* footer */}
        <div className='mt-48 flex '>
            <p>
                2025. All rights reserved
            </p>
            <p>
                Iron Coding 
            </p>
            <div>
                <a href=""><FaFacebook/></a>
                <a href=""><FaTwitter/></a>
                <a href=""><FaLinkedin/></a>
                <a href=""><FaInstagram/></a>
            </div>
        </div>
    </div>
  )
}

export default Contact