"use client";
import React from 'react';
import { TechStackList } from './TechStackList';
import { useAppSelector } from '@/app/redux/hooks';
import { RootState } from '../../../redux/store';
import useDetectScreenSize from './useDetectScreenSize';
import { motion } from 'framer-motion';

const upVariants = {
    hidden: {
        y: 100,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1
    }
}

type TechStackList = {
    name: string;
    icon: React.ElementType;
    textColor: string;
    textStyle: string;
}

const LargeScreen = () => {
    const screenSize = 1024
    useDetectScreenSize(screenSize);
    const isScreenSmall = useAppSelector((state: RootState) => state.isScreenSmall.value);

    let groupSize = isScreenSmall ? 2 : 3;

    // Based on the screen size
    // Different number of element in a group will be displayed in a row
    const groupArr = (arr: Array<TechStackList>) => {
        const result = [];
        for (let i = 0; i < arr.length; i += groupSize) {
            const group = arr.slice(i, i + groupSize);
            result.push(group);
        }
        return result;
    }

    const chunkedArr = groupArr(TechStackList);
    return (
        <div>
            {chunkedArr.map((row, rowIndex) => (
                <motion.div 
                    key={rowIndex} 
                    initial="hidden"
                    whileInView="visible"
                    variants={upVariants}
                    transition={{
                        duration: 0.5
                    }}
                    viewport={{
                        once: false,
                        amount: 0.5
                    }}
                    className="stats shadow flex content-center items-center mb-5 "
                >
                    {row.map(({name, icon: Icon, textStyle}, index) => (
                        <div key={index} className='stat'>
                            <div className="stat-figure">
                                <Icon className='text-4xl' />
                            </div>
                            <div className={`${textStyle}`}>
                                {name}
                            </div>
                        </div>
                    ))}
                </motion.div>
            ))}
        </div>
    )
}

export default LargeScreen