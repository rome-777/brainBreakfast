const { Configuration, OpenAIApi } = require('openai');

// -- CONSTANTS -- //
// ** make API keys secret
// ** add options for engine in the app (give a list of two cheapest ones)
const API_KEY_OPENAI = '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';
// process.env.OPENAI_API_KEY
const ENGINE = 'text-curie-001';

// -- CONFIGURATION -- //
const configuration = new Configuration({
  apiKey: API_KEY_OPENAI,
});
const openai = new OpenAIApi(configuration);

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