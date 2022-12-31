import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const initPrefix2 = `Classify the following achievements as one of the following competencies. Provide the best match even if some competencies are not matched to any achievement.

Achievements: `
const compPrefix = `Competencies: `;
const generateAction2 = async (req, res) => {
    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${initPrefix2}\n${req.body.inputUpdates}\n\n${compPrefix}${req.body.inputCompetencies}`,
        temperature: 0.5,
        max_tokens: 300,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    const secondPrompt = `${basePromptOutput.text}\nFor each achievement competency pair above, write a ~100 word resume paragraph explaining how the achievement demonstrates successful application of the competency. Provide additional elaboration even if fictional.\nParagraphs: `
    const secondPromptCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${secondPrompt}`,
        temperature: 0.8,
        max_tokens: 1000,
    });

    const secondPromptOutput = secondPromptCompletion.data.choices.pop();

    res.status(200).json({output: secondPromptOutput});
}

export default generateAction2;
