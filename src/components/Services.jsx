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
    <div>
        <div>
          <h2>Services</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, deleniti!</p>
          <div>
            {
              serviceData.map((service, index) =>(
                <div
                  key={index}>
                    <FaAppStore/>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
              ))
            }
          </div>
        </div>
    </div>
  )
}

export default Services