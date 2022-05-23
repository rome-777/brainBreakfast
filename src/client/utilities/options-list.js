import '../styles/message-list.css';
import { Paper, Typography, ListItem, ListItemText } from '@mui/material';
import React from 'react';

export const optionsList = (handleSelectedOption, options) => {
    return Object.keys(options).map((key, index) =>
        <ListItem
            className='option-list-item'
            key={index}
            sx={{
                padding: '5px',
            }}
        >
            <Paper
                elevation={2}
                sx={{
                    backgroundColor: '#eaddf0',
                    maxWidth: '25%'
                }}
            >
                <ListItemText
                    primary={key}
                    sx={{
                        padding: '10px',
                    }}
                    onClick={(e) => handleSelectedOption(key, e)}
                />
            </Paper>
        </ListItem>
    );
};