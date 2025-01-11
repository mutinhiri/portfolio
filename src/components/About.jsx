import React from 'react'
import aboutImg from '../assets/aboutImg.jpg'

const About = () => {
  return (
    <div className='text-white py-16'>
      <div className='container mx-auto px-4 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold mb-8 underline'>About Me</h2>
        <p className='mb-12 text-gray-400 text-center'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis aliquid illum quas facere labore omnis iure maiores, officia ducimus officiis, sit quia quisquam reiciendis quis. Minus quibusdam magnam veritatis tenetur.
        </p>
        <div className='flex flex-col md:flex-row justify-center items-center'>
          <div className='mb-8 md:mb-0 md:mr-8 flex justify-center'>
            <img
            src={aboutImg}
            className='w-2/3 sm:w-1/2 md:w-10/12'
            />
          </div>
          <p
          className='md:w-1/2 text-gray-400 px-4 md:px-0 text-base sm:text-lg md:text-xl'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi laborum laboriosam omnis dicta, necessitatibus ipsa suscipit minima officiis ipsum ipsam voluptate debitis magni repellendus nemo.
          </p>
        </div>
        <div className='flex flex-col sm:flex-row justify-around items-center mt-12 space-y-6 sm:space-y-0'>
          <div className='text-center'>
            <h3 className='text-3xl md:text-8xl font-bold md:my-6'> 50 + </h3>
            <p className='text-sm sm:text-base text-gray-300'>Overall Global Customers</p>
          </div>
        </div>

        <div>
          <div>
            <h3 className='text-3xl md:text-8xl font-bold md:my-6'> 5+ </h3>
            <p className='text-sm sm:text-base text-gray-300'>Years of development</p>
          </div>
        </div>

        <div>
          <div>
            <h3 className='text-3xl md:text-8xl font-bold md:my-6'> 90 + </h3>
            <p className='text-sm sm:text-base text-gray-300'>Projects delivered</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About