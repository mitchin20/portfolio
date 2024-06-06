import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { ContactIcon, EmailIcon } from "../svgs";
import ContactForm from "./components/contact/ContactForm";

const ContactSection = () => {
    return (
        <div
            id="contact"
            className='bg-[url("/images/contact-bg.jpg")] bg-cover bg-center bg-no-repeat max-h-full max-w-full py-3 px-4 md:px-24 lg:px-[20%] xl:px-[25%] 2xl:px-[30%]'
        >
            <div
                className="text-center mt-32 mb-32 px-4 sm:text-sm"
            >
                <h1 className="text-2xl text-indigo-700 font-medium mt-3 mb-3">
                    Let&apos;s Chat!
                </h1>

                <p className="text-gray-900 leading-8">
                    I would love to learn about your project. I am available for hire. If you have any questions, comments, or suggestions. I&apos;d love to hear from you and get to know you better!
                </p>
                
                <div className="flex mt-10 mb-10 justify-center space-x-40 sm:space-x-7 text-gray-700 sm:text-xs">
                    <div className="flex flex-col items-center gap-5">
                        <ContactIcon className="text-4xl sm:text-2xl" />
                        <a
                            href="tel:(267) 324-2265"
                            className="text-blue-700"
                        >
                            (267) 324-2265
                        </a>
                    </div>

                    <div className="flex flex-col items-center gap-5">
                        <EmailIcon className="text-4xl sm:text-2xl" />
                        <a 
                            href="mailto:example@email.com"
                            className="text-blue-700"
                        >
                            gnguyen5464@gmail.com
                        </a>
                    </div>

                    <div className="flex flex-col items-center gap-5">
                        <FaLinkedin className="text-4xl sm:text-2xl"/>
                        <div>
                            <a 
                                href='https://www.linkedin.com/in/giang-nguyen-921661188'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-blue-700'
                            >
                                Giang Nguyen
                            </a>
                        </div>
                    </div>
                </div>

                <div className="text-gray-900 mb-10">
                    Or send me a message through the form below.
                </div>

                <ContactForm />
            </div>
        </div>
    )
}

export default ContactSection;