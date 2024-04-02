"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { TechStackList } from './TechStackList';

const rightVariants = {
    hidden: {
        x: 100, 
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1
    }
}

const leftVariants = {
    hidden: {
        x: -100, 
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1
    }
}

const SmallScreen = () => {
    return (
        <ul className="timeline timeline-vertical">
            {TechStackList.map(({name, icon: Icon, textColor}, index) => (
                <li key={index}>
                    {index !== 0 && <hr/>}
                    <motion.div
                        initial="hidden"
                        whileInView="visible" 
                        variants={index % 2 === 0 ? rightVariants : leftVariants}
                        transition={{
                            duration: 0.5
                        }}
                        viewport={{
                            once: false,
                            amount: 0.5
                        }}
                        className={`${index % 2 === 0 ? "timeline-end" : "timeline-start"} timeline-box ${textColor}`}
                    >
                        {name}
                    </motion.div>
                    <div className="timeline-middle">
                        <Icon className="text-2xl" />
                    </div>
                    {index !== TechStackList.length - 1 && <hr/>}
                </li>
            ))}
        </ul>
    )
}

export default SmallScreen