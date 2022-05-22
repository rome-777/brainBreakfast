// -- CONSTANTS -- //
const allBotPrompts = {
    about: 'I am here to give you all the information you need to start your day',
    options: 'You can ask me anything you want or chose from one of the options below'
}
const allAiPrompts = {
    greeting: 'greet me message like a personal assistant',
};

// -- SCRIPTS -- //
export const initChatScript = async (postBotMessage, postApiResponse) => {
    await postApiResponse(allAiPrompts.greeting);
    await postBotMessage(allBotPrompts.options, 4000);
}