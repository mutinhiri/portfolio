import React from 'react'
import projectImg from "../assets/avatar.png"

const Work = () => {

    const projects = [
        {
            id:11,
            title: "Text toitle",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non totam, nisi dolore voluptas facilis sunt in.",
            image: projectImg,
            link: '#'
        },
        {
            id:12,
            title: "App DAshboard",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non totam, nisi dolore voluptas facilis sunt in.",
            image: projectImg,
            link: '#'
        },
        {
            id:13,
            title: "Text toitle",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non totam, nisi dolore voluptas facilis sunt in.",
            image: projectImg,
            link: '#'
        },
    ]
  return (
    <div className='py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='text-4xl text-white underline font-bold text-center mb-12'>My Work</h2>
            <p className='mb-12 text-gray-400 text-center'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod hic modi officiis at expedita tenetur.
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                {
                    projects.map((project) => (
                        <div 
                        key={project.id}>
                            <img src={project.image}/>
                            <div>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <button>Details</button>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Work