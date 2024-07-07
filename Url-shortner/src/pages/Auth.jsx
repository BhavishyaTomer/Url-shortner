import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import { urlState } from '@/context'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const [searchParams] = useSearchParams()
  const longLink=searchParams.get("createNew")
  const {isAuthenticated,loading}=urlState()
  const navigate=useNavigate()
  useEffect(()=>{
    console.log("hitting");
    console.log(isAuthenticated,loading);
if(isAuthenticated && !loading){
  navigate(`/dashboard?${longLink?`createNew=${longLink}`:""}`)
}
  },[isAuthenticated,loading,navigate])
  return (
    <div className='flex flex-col items-center mt-20 gap-10'>
      <h1 className='text-5xl font-extrabold'>
        {
          longLink ? ("Lets login First") : ("Login / Sign Up")
        }
      </h1>
      <Tabs defaultValue="login" className="w-full flex flex-col items-center">
        <TabsList className="w-2/4">
          <TabsTrigger value="login" className="w-full">login</TabsTrigger>
          <TabsTrigger value="SignUp" className="w-full">sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="w-2/4"><Login/></TabsContent>
        <TabsContent value="SignUp" className="w-2/4"><Signup/></TabsContent>
      </Tabs>

    </div>
  )
}

export default Auth