import openai from "./openaiConfig";

const letterBasePrompt = 
`
Generate a long and well-detailed cover letter with the recipient's address on the top right hand corner of the page and a title in bold after the salutation. Use the information provided below. Wrap each paragraph in a html <p></p> tag.
`

const generateLetter = async (req, res) => {

  const letterCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:`${letterBasePrompt}${req.body.completeLetterPrompt}`,
    temperature: 0.7,
    max_tokens: 800,
  });

  const letterOutput = letterCompletion.data.choices.pop();

  res.status(200).json({ output: letterOutput})
}

export default generateLetter;