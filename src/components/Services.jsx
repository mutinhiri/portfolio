import React from 'react'
import { FaAppStore } from 'react-icons/fa'
import {motion} from "motion/react"
import { useInView } from 'react-intersection-observer'
// import { FaAppStore } from 'react-icons/fa'

const Services = () => {

  const serviceData = [
    {
      title: "Custom Software Development",
      description: "We design and build software solutions tailored to your business needs — from web and desktop applications to enterprise systems that streamline operations and drive growth."
    },

    {
      title: "Web & Mobile Application Development",
      description: "Create responsive websites and intuitive mobile apps that enhance user experience, increase engagement, and deliver measurable results."
    },

    {
      title: "Cloud Solutions & DevOps",
      description: "Leverage scalable cloud infrastructure, automation, and modern DevOps practices to optimize performance, security, and reliability."
    },

    {
      title: "Business Process Automation",
      description: "Streamline repetitive tasks, integrate systems, and improve operational efficiency with intelligent automation solutions."
    },
    {
      title: "IT Consulting & Digital Transformation",
      description: "Partner with our experts to align technology strategy with business goals, implement digital transformation initiatives, and maximize ROI."
    },
    {
      title: "Support & Maintenance",
      description: "Ensure your systems and software remain secure, updated, and fully optimized with reliable ongoing support and maintenance services."
    },
  ];

  const {ref, inView} = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  return (
    <div className='text-white py16' id='services'>
        <motion.div
         ref={ref}
         initial={{opacity: 0, y:50}}
         animate={inView ? {opacity: 1, y:0 } : {}}
         transition={{duration: 0.5}}
          className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold underline mb-8'>Services</h2>
          <p className='mb-12 text-gray-400'>Delivering Smart Solutions for Every Business.</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {
              serviceData.map((service, index) =>(
                <motion.div
                  ref={ref}
                  initial={{opacity: 0, scale: 0.8}}
                  animate={inView ? {opacity: 1, scale:1 } : {opacity: 0, scale: 0.8}}
                  transition={{duration: 0.5, delay: index * 0.2}}
                  key={index}
                  className='bg-[#1c1a2b] rounded-lg p-6 text-center hover:shadow-lg hover:shadow-purple-500 transition-shadow duration-300'>
                    <FaAppStore className='text-purple-500 text-4xl sm:text-5xl lg:text-6xl mb-4 mx-auto'/>
                    <h3 className='text-lg sm:text-xl lg:text-2xl font-semibold mb-2'>{service.title}</h3>
                    <p className='text-sm sm:text-base lg:text-lg text-gray-400'>{service.description}</p>
                  </motion.div>
              ))
            }
          </div>
        </motion.div>
    </div>
  )
}

export default Services