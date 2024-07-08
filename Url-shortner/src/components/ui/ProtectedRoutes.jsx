import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { BarLoader } from 'react-spinners'
import { urlState } from '@/context'

const ProtectedRoutes = ({children}) => {
    const {isAuthenticated,loading}=urlState()
    const navigate=useNavigate()
    useEffect(()=>{
        if(!isAuthenticated && !loading){
            navigate("/auth")
        }
    },[isAuthenticated,loading,navigate])
    
    if(loading)
    {
        return <BarLoader width={"100%"} color='green' />
    }
    if(isAuthenticated)
    {
        return children
    }
}

export default ProtectedRoutes