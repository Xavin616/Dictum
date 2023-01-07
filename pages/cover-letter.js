import { Textarea, Button } from '@mantine/core'
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import Router from 'next/router';
import React, { useState } from 'react';
import useStore from '../store/store';


export default function Letter() {
    const [info, setInfo] = useState("Name: Jon Snow \nJob Role: King of the North \nRecipient: Daenerys Targaryen \nCompany Name: Westeros ")
    const [isLoading, setIsLoading] = useState(false)
    const [generatedOutput, setGeneratedOutput] = useState("")
    const addOutput = useStore(state => state.newOutput)

    const handleChange = (e) => {
        e.preventDefault()
        setInfo(e.currentTarget.value)
    }

    const handleSubmit = () => {
        setIsLoading(true);
        console.log(info);
        generateLetterAPI();
    }

    const generateLetterAPI = async () => {
        const completeLetterPrompt = 
            `
            Information: 
            ${info}

            Letter:
            `
        
        const response = await fetch('/api/generate-letter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({completeLetterPrompt})
        })

        const data = await response.json();
        const { output } = data;

        setGeneratedOutput(`${output.text}`);
        addOutput(output.text);
        updateNotification({
            id: 'loading-data',
            title: 'Your cover letter is ready!',
            icon: <IconCheck/>,
            autoClose: 2000
        });
        Router.push({
            pathname: '/editor'
        })
        
    }

    return (
        <div className="w-full h-full">
            <div className="bg-white p-8 rounded-md md:w-3/4 m-auto">
                <div className="text-xl font-extrabold text-center">
                    <h2 className="mt-3 mb-5 text-orange-500 text-md">Cover Letter Generator</h2>
                </div>
                <section className="w-3/5 m-auto sm:w-3/4">
                    <div className="mt-8 w-full m-auto">
                        <Textarea
                            placeholder='Enter information you want added to your cover letter, e.g &#10;Your name, Desired Job Role, Other information'
                            autosize
                            size='md'
                            minRows={12}
                            radius={'md'}
                            value={info}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="my-4 w-full text-center">
                        <Button 
                            className="w-full" 
                            radius={'md'} 
                            size="lg" 
                            onClick={() => { 
                                showNotification({
                                    id: 'loading-data',
                                    title: "This might take a while..",
                                    message: "Please wait while the AI is creating your cover letter",
                                    loading: true,
                                    autoClose: false,
                                    disallowClose: true
                                }); 
                                handleSubmit(); }} 
                            loading={isLoading}
                        >
                            Generate
                        </Button>
                    </div>
                </section>
            </div>
        </div>
  )
}
