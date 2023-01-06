// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration)


const letterBasePrompt = 
`
Generate a long and well-detailed cover letter with the recipient's address on the top right hand corner of the page and a title in bold after the salutation. Use the information provided below. Wrap the entire letter in the html <div></div> tag and wrap each paragraph in a html <p></p> tag.
`

const generateLetter = async (req, res) => {

  const letterCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:`${letterBasePrompt}${req.body.completeLetterPrompt}`,
    temperature: 0.7,
    max_tokens: 450,
  });

  const letterOutput = letterCompletion.data.choices.pop();

  res.status(200).json({ output: letterOutput})
}

export default generateLetter;