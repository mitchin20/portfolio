"use client";

import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';

export default function Playground() {

    return (
        <div>
            <div
                className='sm:text-sm'
            >
                <Alert severity='info'>
                    <Typography paragraph>
                        Welcome to the Playground!
                    </Typography>
                    <Typography paragraph>
                        Here, you can explore and test different projects I&apos;ve built.
                    </Typography>
                    <Typography paragraph>
                        Dive in and have fun!
                    </Typography>
                </Alert>
            </div>
        </div>
    );
}
