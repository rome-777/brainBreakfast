
import { Container, Paper, Box, Typography, Divider, Grid, List, ListItem, ListItemText, FormControl, TextField, IconButton } from '@mui/material';
import { SendRounded } from '@mui/icons-material';
import React, { useState, useEffect, useReducer, useRef, Fragment } from 'react';

// -- CONSTANTS -- //
const SET_ALL_MESSAGES = 'SET_ALL_MESSAGES';
const SET_CURRENT_USER_MESSAGE = 'SET_CURRENT_MESSAGE';
const HANDLE_SEND_USER_MESSAGE = 'HANDLE_SEND_USER_MESSAGE';

//-- REDUCER ACTIONS -- //
const _setAllMessages = (messagesArray) => ({ type: SET_ALL_MESSAGES, messagesArray });
const _setCurrentMessage = (message) => ({ type: SET_CURRENT_USER_MESSAGE, message });
const _handleSendUserMessage = () => ({ type: HANDLE_SEND_USER_MESSAGE });

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
            return { ...state, currentMessage: action.message };
        case HANDLE_SEND_USER_MESSAGE:
            const updatedMessageList = [...state.allMessages, state.currentMessage];
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
        // setAllMessages([]);
        // scroll to bototom
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

    const sendUserMessage = (e) => {
        if (state.currentMessage) {
            console.log('sendng..');
            dispatch(_handleSendUserMessage());
        }
        // ** add message to all messages in the state, mark as user message -> make message util with timestamp and id
        // ** async logic to handle the API
    };

    // utility to map messages from state into list items
    // replace index with message id + add sender prop and text prop
    // secondary={msg.messageText} 
    const populateMessages = state.allMessages.map((msg, index) => 
        <ListItem key={index}>
            <ListItemText
                primary={msg}
            />
        </ListItem>
    );

    // LOGS //
    console.log(state);
    console.log(populateMessages);

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