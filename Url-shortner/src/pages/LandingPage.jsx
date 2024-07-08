import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

  const [longUrl,setLongUrl]=useState('')
  const navigate=useNavigate()
  const handleSubmit=(e)=>{
  e.preventDefault();

  if(longUrl)
  {
  navigate(`/auth?createNew=${longUrl}`)

   } }
  return (
    <div className='flex flex-col item-center'>
    <h2 className='my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold'>
      Change your Boring Urls here.😎
    </h2>
    <form className='sm:h-14 flex flex-col w-full sm:flex-row w-full md:w-2/4 gap-2 ' onSubmit={handleSubmit}>
      <Input type="url" placeholder="type your loooong URL" className="flex flex-1 px-4 py-4" onChange={(e)=>setLongUrl(e.target.value)} />
      <Button type="submit" variant="destructive">
        Shorten!!</Button>
    </form>
    <img src='../../assests/banner.jpeg' alt='banner' className='w-full my-11 sm:py-11' />
    <Accordion type="multiple" collapsible className="w-full md:px-11">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          How does the Trimrr URL shortener works?
        </AccordionTrigger>
        <AccordionContent>
          When you enter a long URL, our system generates a shorter version of
          that URL. This shortened URL redirects to the original long URL when
          accessed.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
  )
}

export default LandingPage