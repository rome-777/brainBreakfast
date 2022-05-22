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
        }
    }
});
const openai = new OpenAIApi(configuration);
console.log('process', process.env)
console.log('apiKey', process.env.API_KEY_OPENAI)

// -- RESPONSE -- //
export async function fetchOpenAiResponse(inputMessage) {
    try {
        const response = await openai.createCompletion(`${ENGINE}`, {
            prompt: inputMessage,
            temperature: 0.8,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });
        return response.data.choices[0].text;
    }
    catch (err) {
        console.log(err);
    }
}