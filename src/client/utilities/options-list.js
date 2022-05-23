import '../styles/options-list.css';
import { Paper, ListItem, ListItemText } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import React from 'react';

export const optionsList = (handleSelectedOption, options) => {
    return Object.entries(options).map((option, index) =>
        <ListItem
            className='option-list-item'
            key={index}
            sx={{
                padding: '5px',
                maxWidth: '80%'
            }}
            onClick={(e) => handleSelectedOption(option, e)}
        >
            <ArrowForwardIosRoundedIcon color='primary'/>
            <Paper
                elevation={2}
                className='option-body'
                sx={{
                    backgroundColor: '#f5e5dc',
                    marginLeft: '10px'
                }}
            >
                <ListItemText
                    primary={option[1]}
                    sx={{
                        padding: '10px',
                    }}
                />
            </Paper>
        </ListItem>
    );
};