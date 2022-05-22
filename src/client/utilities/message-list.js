import { Paper, Typography, ListItem, ListItemText } from '@mui/material';
import React from 'react';

export const messageList = (messages) => {
    if (!messages) return <div/>;
    return messages.map((message, index) =>
        <ListItem
            key={index}
            sx={{
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                padding: '5px',
            }}
        >
            <Paper
                elevation={2}
                sx={{
                    backgroundColor: message.sender === 'user' ? '#d3eaf5' : '#eaddf0',
                    maxWidth: '50%'
                }}
            >
                <ListItemText
                    primary={message.text}
                    secondary={message.time}
                    sx={{
                        padding: '10px',
                    }}
                />
            </Paper>
        </ListItem>
    );
};