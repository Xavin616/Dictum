// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration)

const basePrompt = 
`
Write a comprehensive personal statement in first person with the below information.

`
const basequestions = 
`
Strictly with the information above, generate a personal statement that answers the following questions.
1. Why have you chsoen this course?
2. What excites you about the subject?
3. Is my previos or current study relevant to the course?
4. Have you got any work experience that might help you?
5. What achievements are you proud of?
6. What skills do you have tha makes you perfect for the course?
7. What plans and ambitions do you have for your future career?

The maximum number of words allowed is 800. The personal statement should be as realistic as possible and should express passion for the course and school.
`

const generateAction = async (req, res) => {

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePrompt}${req.body.completePrompt}${basequestions}`,
    temperature: 0.7,
    max_tokens: 800,
  });

  const baseOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: baseOutput });
}

export default generateAction;