import React from 'react';
import ProjectList from './components/projects/ProjectList';

const ProjectsSection = () => {
  return (
    <div className='max-h-full py-3 px-4 md:px-24 lg:px-[5%] xl:px-[8%] 2xl:px-[10%]'>
        <h1 className='divider text-center py-20 font-semibold text-lg'>
            Projects
        </h1>

        <p>
            Projects List
        </p>
        <br/>
        <ProjectList />
    </div>
  )
}

export default ProjectsSection