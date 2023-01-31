import openai from "./openaiConfig"

const basePrompt = 
`
Write a comprehensive personal statement in first person with the below information.

`

const testPrompt = `Please write a personal statement that describes your academic achievements, personal interests, and career goals. Your statement should be approximately 500 words long and should focus on how your unique experiences and goals make you a strong candidate for admission to [Name of College or University]. Be sure to include any relevant experiences, such as extracurricular activities, internships, or community service. Also, discuss any challenges or obstacles you have overcome and how they have shaped your perspective and goals.`
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

const generateStatement = async (req, res) => {

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePrompt}${req.body.completePrompt}${basequestions}`,
    temperature: 0.7,
    max_tokens: 800,
  });

  const baseOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: baseOutput });
}

export default generateStatement;