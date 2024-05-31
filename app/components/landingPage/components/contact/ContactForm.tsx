"use client";

import React, { useEffect, useState, useRef } from "react";
import { useFormState, useFormStatus  } from "react-dom";
import { contact } from "./contactAction";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const initialState = {
    success: false,
    message: ''
}

const ContactForm = () => {
    const ref = useRef<HTMLFormElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [formState, formAction] = useFormState(contact, initialState);

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        if (formState.success) {
            setIsOpen(true);
        }
    }, [formState, formState.success])

    console.log("Form State:", formState);

    return (
        <div>
            {!formState?.success && formState?.message.includes('Limit reached') && (
                <div className="text-center text-red-500">
                    {formState.message}
                </div>
            )}
            <form
                ref={ref}
                action={formAction}
                className="space-y-5"
            >
                <div>
                    <label className="block text-left text-sm font-medium text-gray-900">
                        Your name
                    </label>
                    <div>
                        <input
                            key={`name-${String(formState.success)}`}
                            id="name"
                            name="name"
                            type="text"
                            defaultValue=""
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
                            key={`email-${String(formState.success)}`}
                            id="email"
                            name="email"
                            type="email"
                            defaultValue=""
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
                            key={`message-${formState.success}`}
                            id="message"
                            name="message"
                            defaultValue=""
                            required
                            maxLength={1000}
                            rows={5}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 resize-none"
                            placeholder="Enter your message here..."
                        />
                    </div>
                </div>

                <SubmitButton />
            </form>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpen}
                onClose={handleCloseModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
            >
                <Fade in={isOpen}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Thank you for reaching out!
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Your message has been sent successfully. I appreciate your interest and will get back to you as soon as possible.
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <LoadingButton
            type="submit"
            disabled={pending}
            loading={pending}
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
        >
           Send message
        </LoadingButton>
    );
}

export default ContactForm;