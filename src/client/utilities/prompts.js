// -- CONSTANTS -- //
const allBotPrompts = {
    offerOptions: "You can ask me anything you want or chose from one of the options below"
}
const allAiPrompts = {
    greet: "write a short greeting explaining that you're OpenAI assistant and offer to be helpful to start the day",
    weather: "tell me today's weather forecast and suggest what to wear",
    news: "summarize today's news headlines in a pargaph",
    joke: "tell me a joke that is not about the chicken"
};

export const initalOptions = {
    weather: "how's the weather",
    news: "what's the news",
    joke: "let's hear a joke"
}

// -- SCRIPTS -- //
export const initChatScript = async (postBotMessage, postApiResponse, displayOptions) => {
    await postApiResponse(allAiPrompts.greet);
    await postBotMessage(allBotPrompts.offerOptions, 4000);
    await displayOptions(initalOptions);
}

export const optionResponse = async (postApiResponse, option) => {
    await postApiResponse(allAiPrompts[option]);
}

