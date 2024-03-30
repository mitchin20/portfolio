import React from 'react';
import { ReactIcon, NextIcon, HtmlIcon, CssIcon, JavaScriptIcon, NodeJsIcon, ApiIcon, DynamoDbIcon, MongoDbIcon, RestApiIcon, LambdaIcon, GitHubIcon, VercelIcon, DockerIcon, AgileIcon } from '../../svgs';

const LargeScreen = () => {
    return (
        <div>
            {/* stats 1 */}
            <div className="stats shadow flex content-center items-center mb-5">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <ReactIcon className="text-4xl" />
                    </div>
                    <div className="stat-value text-sm text-sky-400 hover:text-3xl transition-all duration-300 ease-in-out">React</div>
                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <NextIcon className="text-4xl" />
                    </div>
                    <div className="stat-value text-sm hover:text-3xl transition-all duration-300 ease-in-out">NextJS</div>
                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <HtmlIcon className="text-4xl" />
                    </div>
                    <div className="stat-value text-sm text-orange-600 hover:text-3xl transition-all duration-300 ease-in-out">HTML</div>
                </div>
            </div>
            {/* stats 2 */}
            <div className="stats shadow flex content-center items-center mb-5">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <CssIcon className="text-4xl" />
                    </div>
                    <div className="stat-value text-sm text-[#1171b6] hover:text-3xl transition-all duration-300 ease-in-out">CSS</div>
                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <JavaScriptIcon className="text-4xl" />
                    </div>
                    <div className="stat-value text-sm text-[#F7DF1E] hover:text-3xl transition-all duration-300 ease-in-out">JavaScript (ES6+)</div>
                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <NodeJsIcon className="text-2xl" />
                    </div>
                    <div className="stat-value text-sm text-[#8CC84B] hover:text-3xl transition-all duration-300 ease-in-out">NodeJS</div>
                </div>
            </div>
            {/* stats 3 */}
            <div className="stats shadow flex content-center items-center mb-5">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <ApiIcon className="text-4xl" />
                    </div>
                    <div className="stat-value text-sm hover:text-3xl transition-all duration-300 ease-in-out">Express</div>
                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <DynamoDbIcon className="text-4xl" />
                    </div>
                    <div className="stat-value text-sm text-[#2D72B8] hover:text-3xl transition-all duration-300 ease-in-out">DynamoDB</div>
                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <MongoDbIcon className="text-4xl" />
                    </div>
                    <div className="stat-value text-sm text-[#58AA50] hover:text-3xl transition-all duration-300 ease-in-out">MongoDB</div>
                </div>
            </div>
            {/* stats 4 */}
            <div className="stats shadow flex content-center items-center mb-5">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <RestApiIcon className="text-4xl" />
                    </div>
                    <div className="stat-value text-sm hover:text-2xl transition-all duration-300 ease-in-out">RESTful API Design</div>
                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <LambdaIcon className="text-4xl" />
                    </div>
                    <div className="stat-value text-sm text-[#FA7E14] hover:text-3xl transition-all duration-300 ease-in-out">AWS Lambda</div>
                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <GitHubIcon className="text-4xl" />
                    </div>
                    <div className="stat-value text-sm hover:text-3xl transition-all duration-300 ease-in-out">Git & GitHub</div>
                </div>
            </div>
            {/* stats 5 */}
            <div className="stats shadow flex content-center items-center mb-5">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <VercelIcon className="text-4xl" />
                    </div>
                    <div className="stat-value text-sm  hover:text-3xl transition-all duration-300 ease-in-out">Vercel</div>
                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <DockerIcon className="text-4xl" />
                    </div>
                    <div className="stat-value text-sm text-[#1794D4] hover:text-3xl transition-all duration-300 ease-in-out">Docker</div>
                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <AgileIcon className="text-4xl" />
                    </div>
                    <div className="stat-value text-sm hover:text-3xl transition-all duration-300 ease-in-out">Agile Methodologies</div>
                </div>
            </div>
        </div>
    )
}

export default LargeScreen