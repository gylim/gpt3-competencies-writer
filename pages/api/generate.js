import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const initPrefix = `Write a resume paragraph describing how the Actions and Outcomes demonstrated application of Skill. Rephrase the words in Skill.
Actions: `;
const ocPrefix = `Outcomes: `;
const skPrefix = `Skill: `
const finalSuffix = `Paragraph: `
const generateAction = async (req, res) => {
    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${initPrefix} ${req.body.inputActions}
        ${ocPrefix} ${req.body.inputOutcomes}
        ${skPrefix} ${req.body.inputSkills}
        ${finalSuffix}
        `,
        temperature: 0.8,
        max_tokens: 250,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
}

export default generateAction;
