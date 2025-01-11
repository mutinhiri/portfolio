import React from 'react'

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
            <img/>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi laborum laboriosam omnis dicta, necessitatibus ipsa suscipit minima officiis ipsum ipsam voluptate debitis magni repellendus nemo.
          </p>
        </div>
        <div>
          <div>
            <h3> 50 + </h3>
            <p>Overall Global Customers</p>
          </div>
        </div>

        <div>
          <div>
            <h3> 5+ </h3>
            <p>Years of development</p>
          </div>
        </div>

        <div>
          <div>
            <h3> 90 + </h3>
            <p>Projects delivered</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About