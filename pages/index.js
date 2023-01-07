// import Head from 'next/head'
// import Image from 'next/image'
import { Inter } from '@next/font/google'
import { Button } from '@mantine/core'
import { useRouter } from 'next/router'
// import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
 

export default function Home() {
  const router = useRouter()

  const linkTo = (addr) => {
    router.push(addr)
  }

  return (
    <div className='w-full h-full text-center leading-5'>
      <div className='w-4/5 m-auto'>
        <div className='px-0 py-3 md:py-20'>
          <h1 className='font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-red-500 h-4/5 md:text-6xl'>
          Unlock the power of AI to generate perfect essays in minutes.
          </h1>
          <span className='text-gray-700 text-lg md:text-xl'>
            Having trouble with cover letters and essays? Let AI do the work with our automated generator!
          </span>
        </div>
        <div className='flex flex-wrap justify-evenly space-x-0'>
          <Button className='mt-3 md:mt-3' onClick={() => linkTo('/cover-letter')} radius={'md'} size='xl'>Cover Letters</Button>
          <Button className='mt-3 md:mt-3' onClick={() => linkTo('/statement')} radius={'md'} size='xl'>Personal Statement</Button>
          <Button className='mt-3 md:mt-3' disabled radius={'md'} size='xl'>Our AI Powered Editor</Button>
        </div>
      </div>
    </div>
  )
}
