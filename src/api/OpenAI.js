// -- CONSTANTS -- //
// ** add options for engine in the app (give a list of two cheapest ones)
const ENGINE = 'text-curie-001';
const END_POINT = 'completions';

// -- CONFIGURATION -- //
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.API_KEY_OPENAI,
    baseOptions: {
        headers: {
            "Content-Type": "application/json"
        },
    }
});
const openai = new OpenAIApi(configuration);

// -- RESPONSE -- //
export async function fetchOpenAiResponse(inputMessage) {
    try {
        const response = await openai.createCompletion(`${ENGINE}`, {
            prompt: inputMessage,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        }, { timeout: 5000 });
        return response.data.choices[0].text;
    }
    catch (err) {
        console.log(err);
    }
}