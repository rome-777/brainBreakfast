
import { Container, Paper, Box, Typography, Divider, Grid, List, ListItem, ListItemText, FormControl, TextField, IconButton } from '@mui/material';
import { SendRounded } from '@mui/icons-material';
import React, { useState, useEffect, useReducer, useRef, Fragment } from 'react';
import moment from 'moment';
import { fetchOpenAiResponse } from '../../api/OpenAI';
import { createMessage, MessageDiv } from './';
import { messageList, messageLoading, useTimeout } from '../utilities/'

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
    const [state, dispatch] = useReducer(reducer, initialState);
    const isLoading = useRef(false);
    const messagesEndRef = useRef(null);
    
    const handleMessageInput = (e) => {
        dispatch(_setCurrentMessage(e.target.value));
    };

    const postUserMessage = () => {
        if (state.currentMessage) {
            const userMessageText = state.currentMessage;
            dispatch(_handlePostNewMessage(createMessage('user', userMessageText)))
            postApiResponse(userMessageText);
        }
    };

    const postApiResponse = (textQuery) => {
        isLoading.current = true;
        setTimeout(async () => {
            const apiResponse = await fetchOpenAiResponse(textQuery);
            isLoading.current = false;
            dispatch(_handlePostNewMessage(createMessage('openai', apiResponse)));
        }, 2000);
    }

    const createMessage = (sender, text) => {
        const dateString = moment(new Date().getTime()).format('dddd MMMM Do, h:mm:ss a');
        return {
            time: dateString,
            sender: sender,
            text: text
        }
    };

    const handleEnterKey = (e) => {
        // ** handle up and down arrows -- could use case switch
        if (e.key === 'Enter') {
            postUserMessage();
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth'});
        }
    }, [state.allMessages]);

    // --- //
    // console.log(state);
    // console.log(messageLoading())
    console.log(isLoading)
    // ---- //

    return (
        <Fragment>
            {/* --- */}
            {/* { console.log('rendered') } */}
            {/* --- */}
            <Container>
                <Paper elevation={6}>
                    <Box p={3}>
                        <Grid container spacing={3} alignItems='center'>
                            <Grid id='chat-dispay-messages' xs={12} item>
                                <List id='chat-list-messages'>
                                    {messageList(state.allMessages)}
                                    {isLoading.current ? messageLoading() : null}
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
                                    onClick={postUserMessage}
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