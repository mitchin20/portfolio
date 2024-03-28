import React from 'react';
import { HtmlIcon, CodeIcon, OtherIcon } from '../svgs';

const SkillSection = () => {
  return (
    <div className='text-lg'>
        <div className='divider my-10'>
            <h1
                className='font-semibold'
            >
                Tech Stack
            </h1>
        </div>
        <ul className="timeline timeline-snap-icon max-sm:timeline-compact timeline-vertical">
            <li>
                <div className="timeline-middle">
                    <HtmlIcon className="text-2xl" />
                </div>
                <div className="timeline-start md:text-end mb-10">
                    <div className="text-lg font-medium mb-5">
                        Front-end
                    </div>
                    <p>
                        <span className='text-sky-400 font-semibold italic'>React:</span> Creating fast and reactive single-page applications.
                    </p>
                    <p>
                        <span className='text-sky-400 font-semibold italic'>Next.js:</span> Enhancing React applications with server-side rendering and static site generation for improved performance and SEO.
                    </p>
                    <p>
                        <span className='text-sky-400 font-semibold italic'>HTML/CSS:</span> Building responsive and accessible user interfaces.
                    </p>
                    <p>
                        <span className='text-sky-400 font-semibold italic'>JavaScript (ES6+):</span> Implementing dynamic and interactive web elements.
                    </p>
                </div>
                <hr/>
            </li>
            <li>
                <hr />
                <div className="timeline-middle">
                    <CodeIcon className="text-2xl text-red-700" />
                </div>
                <div className="timeline-end mb-10">
                    <div className="text-lg font-medium mb-5">
                        Back-end
                    </div>
                    <p>
                        <span className='text-sky-400 font-semibold italic'>Node.js:</span> Developing scalable and efficient server-side applications.
                    </p>
                    <p>
                        <span className='text-sky-400 font-semibold italic'>Express:</span> Simplifying the creation of web servers and APIs with Node.js.
                    </p>
                    <p>
                        <span className='text-sky-400 font-semibold italic'>DynamoDB:</span> Utilizing this AWS NoSQL database for high-performance, scalable applications, perfect for serverless architectures.
                    </p>
                    <p>
                        <span className='text-sky-400 font-semibold italic'>MongoDB:</span> Using this NoSQL database to store and retrieve data dynamically.
                    </p>
                    <p>
                        <span className='text-sky-400 font-semibold italic'>RESTful API Design:</span> Designing APIs that adhere to REST principles for compatibility and ease of use.
                    </p>
                    <p>
                        <span className='text-sky-400 font-semibold italic'>AWS Lambda:</span> Building and deploying serverless functions to handle backend processes efficiently and cost-effectively.
                    </p>
                </div>
                <hr />
            </li>
            <li>
                <hr />
                <div className="timeline-middle">
                    <OtherIcon className="text-2xl text-orange-600" />
                </div>
                <div className="timeline-start md:text-end mb-10">
                    <div className="text-lg font-medium mb-5">
                        Other
                    </div>
                    <p>
                        <span className='text-sky-400 font-semibold italic'>Git & GitHub:</span> Version control and source code management.
                    </p>
                    <p>
                        <span className='text-sky-400 font-semibold italic'>Vercel:</span> Deploying and hosting Next.js applications with seamless integration and automatic scaling.
                    </p>
                    <p>
                        <span className='text-sky-400 font-semibold italic'>Docker:</span> Containerizing applications for consistent development and deployment environments.
                    </p>
                    <p>
                        <span className='text-sky-400 font-semibold italic'>Agile Methodologies:</span> Working in iterative development cycles, adapting quickly to changes.
                    </p>
                </div>
                <hr />
            </li>
        </ul>
    </div>
  )
}

export default SkillSection