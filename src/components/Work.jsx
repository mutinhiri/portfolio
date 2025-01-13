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
            title: "Text toitle",
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
    <div>
        <div>
            <h2>My Work</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod hic modi officiis at expedita tenetur.
            </p>
            <div>

            </div>
        </div>
    </div>
  )
}

export default Work