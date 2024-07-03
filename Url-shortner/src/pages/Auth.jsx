import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'


const Auth = () => {
  const [searchParams] = useSearchParams()
  return (
    <div className='flex flex-col items-center mt-20 gap-10'>
      <h1 className='text-5xl font-extrabold'>
        {
          searchParams.get("createNew") ? ("Lets login First") : ("Login / Sign Up")
        }
      </h1>
      <Tabs defaultValue="login" className="w-full flex flex-col items-center">
        <TabsList className="w-2/4">
          <TabsTrigger value="login" className="w-full">login</TabsTrigger>
          <TabsTrigger value="SignUp" className="w-full">sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="w-2/4"><Login/></TabsContent>
        <TabsContent value="SignUp"><Signup/></TabsContent>
      </Tabs>

    </div>
  )
}

export default Auth