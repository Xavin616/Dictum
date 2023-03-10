import { TextInput, MultiSelect, Button } from "@mantine/core";
import { useState } from "react";
import useStore from "../store/store";
import Router from "next/router";
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck } from "@tabler/icons";

export default function Prompt() {
    const [intro, setIntro] = useState({username: '', course: '', school: '',})
    const [edudata, setEduData] = useState([]);
    const [skills, setSkills] = useState([]);
    const [accom, setAccom] = useState([]);
    const [isload, setLoading] = useState(false)
    const [apiOutput, setApiOutput] = useState('')
    const getOutput = useStore((state) => state.output)
    const addOutput = useStore((state) => state.newOutput)

    const handleUser = (e) => {
        setIntro(intro => ({
            ...intro,
            username: e.target.value,
        }));
        // console.log(intro)
    }

    const handleCourse = (e) => {
        setIntro(intro => ({
            ...intro,
            course: e.target.value,
        }));
        // console.log(intro)
    }

    const handleSchool = (e) => {
        setIntro(intro => ({
            ...intro,
            school: e.target.value,
        }));
        // console.log(intro)
    }


    const callGenerateEndpoint = async () => {
        const completePrompt = 
            `
                Name: ${intro.username}
                Course: ${intro.course}
                School: ${intro.school}
                Education: ${edudata[0]}, ${edudata[1]}, ${edudata[2]}
                Skills: ${skills[0]}, ${skills[1]}, ${skills[2]}
                Other things: ${accom[0]}, ${accom[1]}, ${accom[2]}
            `

        // console.log("Calling API...")
        const response = await fetch('/api/generate-statement', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({completePrompt})
        })
    
        const data = await response.json()
        const { output } = data;
        // console.log("OpenAI replied...", output.text)
    
        setApiOutput(`${output.text}`);
        addOutput(output.text);
        updateNotification({
            id: 'loading-data',
            title: 'Your cover letter is ready!',
            icon: <IconCheck/>,
            autoClose: 2000
        });
        // // console.log(output.text)
        Router.push({
            pathname: '/editor',
        })
        //     query: {
        //         output: output.text
        //     },
        // }, '/editor')
      }

    const handleSubmit = () => {
        console.log(apiOutput)
        addOutput('new output')
        console.log(`Zustand Output: ${getOutput}`)
    }

  return (
    <div className="w-full h-full bg-white">
        <div className="bg-white p-2 rounded-lg md:w-3/5 m-auto p-8">
            <div className="text-xl font-extrabold text-center">
                <h2 className="mt-5 mb-5 text-orange-500 text-md">Personal Statement Generator </h2>
            </div>
            <section className="w-full m-auto md:w-4/5">
                <div className="mt-6">
                    <div className="text-sm">
                        <h2 className="my-2">Intro</h2>
                    </div>
                    <div className="flex flex-wrap w-full">
                        <TextInput radius={'md'} name="username" onChange={handleUser} value={intro.username} size="md" placeholder="John Doe" className="my-1.5 mr-2 basis-1/3 grow shrink"/>
                        <TextInput radius={'md'} name="course" onChange={handleCourse} value={intro.course} size="md" placeholder="Mechanical Engineering B.Eng" className="my-1.5 basis-1/3 grow"/>
                        <TextInput radius={'md'} name="school" onChange={handleSchool} value={intro.school} size="md" placeholder="Chosen School e.g. University of Texas" className="my-1.5 mr-2 basis-2/3 grow"/>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="text-sm">
                        <h2 className="my-2">Education/Experience</h2>
                    </div>
                    <div className="flex flex-wrap w-full">
                        <MultiSelect
                            radius={'md'}
                            placeholder="Enter your Educational History or Past Experiences"
                            data={edudata}
                            creatable
                            searchable
                            getCreateLabel={(query) => `+ Create ${query}`}
                            onCreate={(query) => {
                                const item = { value: query, label: query };
                                setEduData((current) => [...current, item]);
                                return item
                            }}
                            size='md'
                            className="w-full h-auto"
                        />
                    </div>
                </div>
                <div className="mt-8">
                    <div className="text-sm">
                        <h2 className="my-2">Skills Acquired</h2>
                    </div>
                    <div className="flex flex-wrap w-full">
                        <MultiSelect
                            radius={'md'}
                            placeholder="Skills acquired over time"
                            data={skills}
                            creatable
                            searchable
                            getCreateLabel={(query) => `+ Create ${query}`}
                            onCreate={(query) => {
                                const item = { value: query, label: query };
                                setSkills((current) => [...current, item]);
                                return item
                            }}
                            size='md'
                            className="w-full"
                        />
                    </div>
                </div>
                <div className="mt-8">
                    <div className="text-sm">
                        <h2 className="my-2">Work Experience</h2>
                    </div>
                    <div className="flex flex-wrap w-full">
                        <MultiSelect
                            radius={'md'}
                            placeholder="Work Experience"
                            data={accom}
                            creatable
                            searchable
                            getCreateLabel={(query) => `+ Create ${query}`}
                            onCreate={(query) => {
                                const item = { value: query, label: query };
                                setAccom((current) => [...current, item]);
                                return item
                            }}
                            size='md'
                            className="w-full"
                        />
                    </div>
                </div>
                <div className="my-7 w-full text-center">
                    <Button 
                        className="w-full" 
                        size="lg" 
                        radius={'md'} 
                        onClick={() => { 
                            setLoading(true);
                            showNotification({
                                id: 'loading-data',
                                title: "This might take a while..",
                                message: "Please wait while the AI is creating your personal statement",
                                loading: true,
                                autoClose: false,
                                disallowClose: true
                            });  
                            callGenerateEndpoint()
                        }} 
                        loading={isload}
                        >
                            Generate
                        </Button>
                </div>
            </section>
        </div>
    </div>
  )
}