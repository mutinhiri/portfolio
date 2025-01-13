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
            </div>
        </div>
    </div>
  )
}

export default Contact