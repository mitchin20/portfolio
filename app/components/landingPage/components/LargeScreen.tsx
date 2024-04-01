"use client";
import React from 'react';
import { TechStackList } from './TechStackList';
import { useAppSelector } from '@/app/redux/hooks';
import { RootState } from '../../../redux/store';
import useDetectScreenSize from './useDetectScreenSize';

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

    let chunkSize = isScreenSmall ? 2 : 3;

    const chunkArr = (arr: Array<TechStackList>) => {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            result.push(chunk);
        }
        return result;
    }

    const chunkedArr = chunkArr(TechStackList);
    return (
        <div>
            {chunkedArr.map((row, rowIndex) => (
                <div key={rowIndex} className="stats shadow flex content-center items-center mb-5">
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
                </div>
            ))}
        </div>
    )
}

export default LargeScreen