
import { Container, Paper, Box, Typography, Divider, Grid, List, ListItem, ListItemText, FormControl, TextField, IconButton } from '@mui/material';
import { SendRounded } from '@mui/icons-material';
import React, { useState, useEffect, useReducer, useRef, Fragment } from 'react';
import moment from 'moment';
import { fetchOpenAiResponse } from '../../api/OpenAI';
import { createMessage, MessageDiv } from './';

// -- CONSTANTS -- //
const SET_ALL_MESSAGES = 'SET_ALL_MESSAGES';
const SET_CURRENT_USER_MESSAGE = 'SET_CURRENT_MESSAGE';
const POST_NEW_MESSAGE = 'POST_NEW_MESSAGE';

//-- REDUCER ACTIONS -- //
const _setAllMessages = (messagesArray) => ({ type: SET_ALL_MESSAGES, messagesArray });
const _setCurrentMessage = (text) => ({ type: SET_CURRENT_USER_MESSAGE, text });
const _handlePostNewMessage = (message) => ({ type: POST_NEW_MESSAGE, message });

// -- REDUCER -- //
const initialState = {
    allMessages: [],
    currentMessage: '',
};
const reducer = (state, action) => {
    switch (action.type) {
        case SET_ALL_MESSAGES:
            return { ...state, allMessages: action.messagesArray };
        case SET_CURRENT_USER_MESSAGE:
            return { ...state, currentMessage: action.text };
        case POST_NEW_MESSAGE:
            const updatedMessageList = [...state.allMessages, action.message];
            return {
                ...state,
                allMessages: updatedMessageList,
                currentMessage: ''
            };
        default:
            return state;
    }
};

export default function ChatBox() {
    // const [user, setUser] = useState('');
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    
    useEffect(() => {
        if(messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth'});
        }
    }, [state.allMessages]);

    const handleMessageInput = (e) => {
        dispatch(_setCurrentMessage(e.target.value));
    };

    const handleEnterKey = (e) => {
        if(e.key === 'Enter'){
            sendUserMessage();
        }
        // ** handle up and down arrows -- could use case switch
    };

    const sendUserMessage = async () => {
        if (state.currentMessage) {
            const userMessageText = state.currentMessage;
            dispatch(_handlePostNewMessage(createMessage('user', userMessageText)));
            setLoading(true);
            const apiResponse = await fetchOpenAiResponse(userMessageText);
            dispatch(_handlePostNewMessage(createMessage('openai', apiResponse)));
            setLoading(false);

            console.log(state.allMessages)
        }
    };

    const createMessage = (sender, text) => {
        const dateString = moment(new Date().getTime()).format('dddd MMMM Do, h:mm:ss a');
        const message = {
            time: dateString,
            sender: sender,
            text: text
        }
        return message;
    };

    const populateMessages = state.allMessages.map((message, index) =>

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
                    backgroundColor: message.sender === 'user' ? '#d3eaf5' : '#eaddf0'
                }}
            >
                <ListItemText
                    sx={{
                        padding: '10px'

                    }}
                    primary={message.text}
                    secondary={message.time}
                />
            </Paper>
        </ListItem>
    );

    // LOGS //

    // console.log(state);
   
    // ---- //

    return (
        <Fragment>
            <Container>
                <Paper elevation={6}>
                    <Box p={3}>
                        <Grid container spacing={3} alignItems='center'>
                            <Grid id='chat-dispay-messages' xs={12} item>
                                <List id='chat-list-messages'>
                                    {populateMessages}
                                    <ListItem ref={messagesEndRef} />
                                </List>
                            </Grid>
                            <Divider/>
                            <Grid id='message-input-field' xs={11} item>
                                <FormControl fullWidth>
                                    <TextField
                                        onChange={handleMessageInput}
                                        onKeyDown={handleEnterKey}
                                        value={state.currentMessage}
                                        label='Ask anything that comes to mind..'
                                        variant='outlined'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid id='button-send-message' xs={1} item>
                                <IconButton
                                    onClick={sendUserMessage}
                                    aria-label='send'
                                    color='primary'
                                >
                                    <SendRounded />
                                </IconButton>
                            </Grid>                             
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </Fragment>
    )
}