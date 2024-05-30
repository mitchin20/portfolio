import React from "react";

const ContactSection = () => {
    return (
        <div
            id="contact"
            className='bg-[url("/images/contact-bg.jpg")] bg-cover bg-center bg-no-repeat max-h-full max-w-full'
        >
            <div
                className="text-center mt-32 mb-32 px-4 sm:text-sm"
            >
                <div className="">
                    <h1 className="text-2xl font-medium mt-3 mb-3">
                        Let&apos;s Chat!
                    </h1>

                    <h5 className="text-gray-900 sm:text-sm">
                        I would love to learn about your project. I am available for hire. If you have any questions, comments, or suggestions. I&apos;d love to hear from you and get to know you better!
                    </h5>
                </div>
                
                <div className="flex mt-10 mb-10 justify-center space-x-20 sm:space-x-5 text-gray-700 sm:text-sm">
                    <div>
                        Call me at
                        <div className="text-blue-700">
                            (267) 324-2265
                        </div>
                    </div>

                    <div>
                        Email me at
                        <div className="text-blue-700">
                            gnguyen5464@gmail.com
                        </div>
                    </div>

                    <div>
                        LinkedIn 
                        <div>
                            <a 
                                href='https://www.linkedin.com/in/giang-nguyen-921661188'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-blue-700'
                            >
                                giang-nguyen
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mb-10">
                    Or send me a message through the form below.
                </div>

                <form
                    className="space-y-5"
                >
                    <div>
                        <label className="block text-left text-sm font-medium leading-6 text-gray-900">
                            Your name
                        </label>
                        <div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-left text-sm font-medium leading-6 text-gray-900">
                            Your email
                        </label>
                        <div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-left text-sm font-medium leading-6 text-gray-900">
                            Your message
                        </label>
                        <div>
                            <textarea
                                id="message"
                                name="message"
                                required
                                maxLength={1000}
                                rows={5}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 resize-none"
                                placeholder="Enter your message here..."
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ContactSection;