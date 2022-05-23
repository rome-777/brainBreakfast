
import { Container, Box, Typography, AppBar, Toolbar, Divider } from '@mui/material';
import React, { Fragment } from 'react';

export default function Bar() {
    return (
        <Fragment>
            <Box p={3} sx={{ flexGrow: 1 }} display='flex' alignItems='center'>
                <AppBar
                    elevation={7}
                    sx={{
                        backgroundColor: '#525457',
                    }}
                >
                    <Toolbar>
                        <Typography variant="h5" gutterBottom>
                            OpenAI ChatBot for Shopify Challenge
                        </Typography>   
                    </Toolbar>
                </AppBar>
            </Box>
        </Fragment>
    )
}