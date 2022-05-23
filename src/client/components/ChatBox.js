
import { Container, Paper, Box, Typography, Divider, Grid, List, ListItem, FormControl, TextField, IconButton } from '@mui/material';
import { SendRounded } from '@mui/icons-material';
import React, { useEffect, useReducer, useRef, Fragment } from 'react';
import moment from 'moment';
import { fetchOpenAiResponse } from '../../api/OpenAI';
import { messageList, messageLoading, initChatScript, optionsList, optionResponse } from '../utilities/'

// -- CONSTANTS -- //
const SET_ALL_MESSAGES = 'SET_ALL_MESSAGES';
const SET_CURRENT_USER_MESSAGE = 'SET_CURRENT_MESSAGE';
const POST_NEW_MESSAGE = 'POST_NEW_MESSAGE';
const LIST_OPTIONS = 'LIST_OPTIONS'

//-- REDUCER ACTIONS -- //
const _setAllMessages = (messagesArray) => ({ type: SET_ALL_MESSAGES, messagesArray });
const _setCurrentMessage = (text) => ({ type: SET_CURRENT_USER_MESSAGE, text });
const _handlePostNewMessage = (message) => ({ type: POST_NEW_MESSAGE, message });
const _setOptions = (options) => ({ type: LIST_OPTIONS, options })

// -- REDUCER -- //
const initialState = {
    allMessages: [],
    currentMessage: '',
    displayedOptions: []
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
        case LIST_OPTIONS:
            return { ...state, displayedOptions: action.options };
        default:
            return state;
    }
};

export default function ChatBox() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const initialized = useRef(false);
    const isLoading = useRef(false);
    const isReady = useRef(false);
    const optionsRef = useRef(false);
    const messagesEndRef = useRef(null);
    
    useEffect(() => {
        if (!initialized.current) {
            initChatScript(postBotMessage, postApiResponse, displayOptions);
            initialized.current = true;
        }
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth'});
        }
    }, [state.allMessages]);

    const handleMessageInput = (e) => {
        dispatch(_setCurrentMessage(e.target.value));
    };

    const createMessage = (sender, text) => {
        const dateString = sender === 'bot' ? '' : moment(new Date().getTime()).format('dddd MMMM Do, h:mm:ss a');
        return {
            time: dateString,
            sender: sender,
            text: text
        }
    };

    const postUserMessage = () => {
        if (state.currentMessage && isReady.current) {
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
            isReady.current = true;
        }, 2000);
    }

    const postBotMessage = (prompt, timeout) => {
        setTimeout(() => {
            dispatch(_handlePostNewMessage(createMessage('bot', prompt)));
        }, timeout);
    }

    const displayOptions = (options, timeout) => {
        optionsRef.current = true;
        setTimeout(() => {
            dispatch(_setOptions(options));
        }, timeout);
    }

    const handleSelectedOption = (option, e) => {
        e.preventDefault;
        optionsRef.current = false;
        dispatch(_setOptions([]));
        dispatch(_handlePostNewMessage(createMessage('user', option[1])))
        optionResponse(postApiResponse, option[0]);
    }

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') postUserMessage();
    };

    return (
        <Fragment>
            <Container>
                <Paper elevation={6}>
                    <Box p={3}>
                        <Grid container spacing={3} alignItems='center'>
                            <Grid id='chat-dispay' xs={11} item>
                                <List id='chat-message-list'>
                                    {initialized.current  ? null : messageLoading()}
                                    {messageList(state.allMessages)}
                                    {isLoading.current ? messageLoading() : null}
                                    {optionsRef.current ? optionsList(handleSelectedOption, state.displayedOptions) : null}
                                    <ListItem ref={messagesEndRef}/>
                                </List>
                            </Grid>
                            <Divider/>
                            <Grid id='message-input-field' xs={11} item>
                                <FormControl fullWidth>
                                    <TextField
                                        onChange={handleMessageInput}
                                        onKeyDown={handleEnterKey}
                                        value={state.currentMessage}
                                        label='Ask me anything..'
                                        variant='outlined'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid id='button-send' xs={1} item>
                                <IconButton
                                    onClick={postUserMessage}
                                    aria-label='send'
                                    color='primary'
                                >
                                    <SendRounded sx={{ fontSize: "35px" }}/>
                                </IconButton>
                            </Grid>                             
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </Fragment>
    )
}