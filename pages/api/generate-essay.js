import openai from "./openaiConfig"

const mainPrompt = 
`
Generate a well-written essay on the given topic. Wrap each paragraph in the <p></p> html tags. Explain each point raised extensively and explicitly. Give examples where necessary. Minimum length should be 1000 words
Topic:
`

const generateEssay = async (req, res) => {
    const essayCompletion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${mainPrompt}${req.body.topic}`,
        temperature: 0.75,
        max_tokens: 3600,
    })

    const essayOutput = essayCompletion.data.choices.pop();

    res.status(200).json({ output: essayOutput })
}

export default generateEssay;