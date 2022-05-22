
import { Container, Box, Typography } from '@mui/material';
import React, { Fragment } from 'react';

export default function AppBar() {

    return (
        <Fragment>
            <Container>
                <Box p={3}>
                    <Typography variant="h5" gutterBottom>
                        Awesome AI Chat
                        
                    </Typography>
                </Box>
            </Container>
        </Fragment>
    )
}