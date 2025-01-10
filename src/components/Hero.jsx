import React from 'react'
import avatar from '../assets/avatar.png'

const Hero = () => {
  return (
    <div className='text-white py-10'>
      <img 
      className='mx-auto w-2/3 md:w-1/3 lg:w-1/4'
      src={avatar}/>
      <div className='container mx-auto text-center'>
        <h1>Your Story , Your Way</h1>
        <span>Build Your Personal Portfolio</span>
        <p>Showcase your Journey through a personal portfolio</p>
        <button>Hire Me</button>
        <button>My Story</button>
      </div>
        
    </div>
  )
}

export default Hero