import React from 'react'
import { FaAppStore } from 'react-icons/fa'
// import { FaAppStore } from 'react-icons/fa'

const Services = () => {
  const serviceData = [
    {
      title: "App Design",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, deleniti!"
    },

    {
      title: "App Design",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, deleniti!"
    },

    {
      title: "App Design",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, deleniti!"
    },

    {
      title: "App Design",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, deleniti!"
    },
    {
      title: "App Design",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, deleniti!"
    },
    {
      title: "App Design",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, deleniti!"
    },
  ]
  return (
    <div className='text-white py16'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold underline mb-8'>Services</h2>
          <p className='mb-12 text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, deleniti!</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {
              serviceData.map((service, index) =>(
                <div
                  key={index}
                  className='bg-[#1c1a2b] rounded-lg p-6 text-center hover:shadow-lg hover:shadow-purple-500 transition-shadow duration-300'>
                    <FaAppStore className='text-purple-500 text-4xl sm:text-5xl lg:text-6xl mb-4 mx-auto'/>
                    <h3 className='text-lg sm:text-xl lg:text-2xl font-semibold mb-2'>{service.title}</h3>
                    <p className='text-sm sm:text-base lg:text-lg text-gray-400'>{service.description}</p>
                  </div>
              ))
            }
          </div>
        </div>
    </div>
  )
}

export default Services