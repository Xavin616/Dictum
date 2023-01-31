import { showNotification, updateNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons'
import React, { useState } from 'react'
import useStore from '../store/store'
import { Textarea, Button } from '@mantine/core'
import Router from 'next/router'

export default function Essay() {
    const [topic, setTopic] = useState('Topic of essay to be generated')
    const [isloading, setIsloading] = useState(false)
    const [generatedOutput, setGeneratedOutput] = useState('')
    const addOutput = useStore(state => state.newOutput)

    const handleChange = e => {
        e.preventDefault()
        setTopic(e.currentTarget.value)
    }

    const handleSubmit = () => {
        setIsloading(true);
        console.log(topic);
        getEssay();
    }

    const getEssay = async () => {
        const response = await fetch('/api/generate-essay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic })
        })

        const data = await response.json();
        const { output } = data;

        setGeneratedOutput(`${output.text}`);
        addOutput(output.text);
        updateNotification({
            id: 'loading-data',
            title: 'Your essay is ready!',
            icon: <IconCheck />,
            autoClose: 2000,
        }),
        Router.push({
            pathname: '/editor'
        })
    }

    return (
        <div className="w-full h-full">
            <div className="bg-white px-2 py-6 rounded-md md:w-3/4 m-auto p-8">
                <div className="text-xl font-extrabold text-center">
                    <h2 className="mt-3 mb-0 text-orange-500 text-4xl">Generate Essays</h2>
                </div>
                <section className="w-full m-auto md:w-4/5">
                    <div className="mt-8 w-full m-auto">
                        <Textarea
                            placeholder='Enter the topic of the essay you want written.'
                            autosize
                            size='md'
                            minRows={12}
                            radius={'md'}
                            value={topic}
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
                            loading={isloading}
                        >
                            Generate
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    )
}
