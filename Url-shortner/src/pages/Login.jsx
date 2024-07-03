import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Error from '@/components/ui/error'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { BeatLoader } from 'react-spinners'
import * as Yup from 'yup'
import useFetch from '@/hooks/use-fetch'
import { login } from '@/utils/apiAuth'

const Login = () => {
  const [formData, setFormData] = useState({
    email: ""
    ,
    password: ""
  }); 
  const [error, setError] = useState([])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData)
  };
 const{data, loading, errors, fn}= useFetch(login,formData)
  const handleErrors = async () => {
    console.log("hitting")
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email("invalid email").required("email is required"),

        password: Yup.string().min(6, "password should have 6 characters").required("password is required")
      })
      await schema.validate(formData, { abortEarly: false })
    await fn()
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setError(newErrors);
    }
  }
  return (
    <div>
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>if you already have an account</CardDescription>
         {errors&& <Error message={errors.message} />}
        </CardHeader>
        <CardContent className="gap-2">
          <div className='space-y-2 mt-3'>
            <Input type='email' placeholder='enter your email' name='email' onChange={handleInputChange} />
            {error.email&& <Error message={error.email} />}
          </div>
          <div className='space-y-2 my-3'>
            <Input type='password' placeholder='enter your password' name='password' onChange={handleInputChange} />
            {error.password&& <Error message={error.password} />}
          </div>
          <Button onClick={handleErrors}>
            {
              loading ? <BeatLoader size={10} /> : "Login"
            }
          </Button>
        </CardContent>

      </Card>


    </div>
  )
}

export default Login