import React from 'react'
import { motion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { FaPhone,
        FaEnvelop, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram
} from 'react-icons/fa'


const Contact = () => {
  return (
    <div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12'>
            <h2 className='text-4xl font-bold text-white '>Lets Discuss Your <span className='text-purple-500'>Project</span></h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, dolores! Placeat eius, labore voluptatibus ea et ipsa minima animi! Dolore.</p>
        </div>
    </div>
  )
}

export default Contact