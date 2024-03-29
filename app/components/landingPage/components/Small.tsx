import React from 'react';
import { ReactIcon, NextIcon, HtmlIcon, CssIcon, JavaScriptIcon, NodeJsIcon, ApiIcon, DynamoDbIcon, MongoDbIcon, RestApiIcon, LambdaIcon, GitHubIcon, VercelIcon, DockerIcon, AgileIcon } from '../../svgs';

const Small = () => {
    return (
        <ul className="timeline timeline-vertical">
            <li>
                <div className="timeline-start timeline-box">
                    <span className='text-sky-400 font-semibold italic'>React</span>
                </div>
                <div className="timeline-middle">
                    <ReactIcon className="text-2xl" />
                </div>
                <hr/>
            </li>
            <li>
                <hr/>
                <div className="timeline-middle">
                    <NextIcon className="text-2xl" />
                </div>
                <div className="timeline-end timeline-box">
                    NextJS
                </div>
                <hr/>
            </li>
            <li>
                <hr/>
                <div className="timeline-start timeline-box">
                    <span className='text-orange-600'>HTML</span>
                </div>
                <div className="timeline-middle">
                    <HtmlIcon className="text-2xl" />
                </div>
                <hr/>
            </li>
            <li>
                <hr/>
                <div className="timeline-middle">
                    <CssIcon className="text-2xl" />
                </div>
                <div className="timeline-end timeline-box">
                    <span className='text-[#1172B8]' >CSS</span>
                </div>
                <hr/>
            </li>
            <li>
                <hr/>
                <div className="timeline-start timeline-box">
                    <span className='text-[#F7DF1E]' >JavaScript (ES6+)</span>
                    
                </div>
                <div className="timeline-middle">
                    <JavaScriptIcon className="text-2xl" />
                </div>
                <hr/>
            </li>
            <li>
                <hr/>
                <div className="timeline-middle">
                    <NodeJsIcon className="text-2xl" />
                </div>
                <div className="timeline-end timeline-box">
                    <span className='text-[#8CC84B]' >NodeJS</span>
                </div>
                <hr/>
            </li>
            <li>
                <hr/>
                <div className="timeline-start timeline-box">
                    <span className='' >Express</span>
                    
                </div>
                <div className="timeline-middle">
                    <ApiIcon className="text-2xl" />
                </div>
                <hr/>
            </li>
            <li>
                <hr/>
                <div className="timeline-middle">
                    <DynamoDbIcon className="text-2xl" />
                </div>
                <div className="timeline-end timeline-box">
                    <span className='text-[#2D72B8]' >DynamoDB</span>
                </div>
                <hr/>
            </li>
            <li>
                <hr/>
                <div className="timeline-start timeline-box">
                    <span className='text-[#58AA50]' >MongoDB</span>
                    
                </div>
                <div className="timeline-middle">
                    <MongoDbIcon className="text-2xl" />
                </div>
                <hr/>
            </li>
            <li>
                <hr/>
                <div className="timeline-middle">
                    <RestApiIcon className="text-2xl" />
                </div>
                <div className="timeline-end timeline-box">
                    <span className='' >RESTful API Design</span>
                </div>
                <hr/>
            </li>
            <li>
                <hr/>
                <div className="timeline-start timeline-box">
                    <span className='text-[#FA7E14]' >AWS Lambda</span>
                    
                </div>
                <div className="timeline-middle">
                    <LambdaIcon className="text-2xl" />
                </div>
                <hr/>
            </li>
            <li>
                <hr/>
                <div className="timeline-middle">
                    <GitHubIcon className="text-2xl" />
                </div>
                <div className="timeline-end timeline-box">
                    <span className='' >Git & GitHub</span>
                </div>
                <hr/>
            </li>
            <li>
                <hr/>
                <div className="timeline-start timeline-box">
                    <span className='' >Vercel</span>
                    
                </div>
                <div className="timeline-middle">
                    <VercelIcon className="text-2xl" />
                </div>
                <hr/>
            </li>
            <li>
                <hr/>
                <div className="timeline-middle">
                    <DockerIcon className="text-2xl" />
                </div>
                <div className="timeline-end timeline-box">
                    <span className='text-[#1794D4]' >Docker</span>
                </div>
                <hr/>
            </li>
            <li>
                <hr/>
                <div className="timeline-start timeline-box">
                    <span className='' >Agile Methodologies</span>
                    
                </div>
                <div className="timeline-middle">
                    <AgileIcon className="text-2xl" />
                </div>
            </li>
        </ul>
    )
}

export default Small