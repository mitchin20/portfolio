'use client';
import React, { useState } from 'react';
import { useCustomFetch } from './useCustomFetch';

const URL = '/api/v1/projects'

interface ProjectList {
    id: string,
    userId: number,
    name: string,
    description: string,
}

const ProjectList = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const projects = useCustomFetch({url: URL, setLoading});

    console.log("projects: ", projects)
    return (
        <div>
            Comming soon
        </div>
    )
}

export default ProjectList