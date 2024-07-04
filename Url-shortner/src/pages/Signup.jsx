import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Error from '@/components/ui/error';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import * as Yup from 'yup';
import useFetch from '@/hooks/use-fetch';
import { signup } from '@/utils/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { urlState } from '@/context';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    profile_pic: null
  });
  const [error, setError] = useState([]);
  
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
    console.log(formData);
  };

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const { data, loading, errors, fn } = useFetch(signup, formData);
  const { fetchUser } = urlState();

  useEffect(() => {
    if (!errors && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [data, error]);

  const handleSignUp = async () => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("name is required"),
        email: Yup.string().email("invalid email").required("email is required"),
        password: Yup.string().min(6, "password should have 6 characters").required("password is required"),
        profile_pic: Yup.mixed().required("profile pic is required")
      });
      await schema.validate(formData, { abortEarly: false });

      const formDataToSubmit = new FormData();
      for (const key in formData) {
        formDataToSubmit.append(key, formData[key]);
      }

      await fn(formDataToSubmit);
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setError(newErrors);
    }
  };

  return (
    <div>
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>Signup if you have not created one.</CardDescription>
          {errors && <Error message={errors.message} />}
        </CardHeader>
        <CardContent className="gap-2">
          <div className='space-y-2 mt-3'>
            <Input type='text' placeholder='enter your name' name='name' onChange={handleInputChange} />
            {error.name && <Error message={error.name} />}
          </div>
          <div className='space-y-2 mt-3'>
            <Input type='email' placeholder='enter your email' name='email' onChange={handleInputChange} />
            {error.email && <Error message={error.email} />}
          </div>
          <div className='space-y-2 my-3'>
            <Input type='password' placeholder='enter your password' name='password' onChange={handleInputChange} />
            {error.password && <Error message={error.password} />}
          </div>
          <div className='space-y-2 my-3 w-2/6'>
            <Input type='file' name='profile_pic' accept="image/*" onChange={handleInputChange} className="text-black bg-white"/>
            {error.profile_pic && <Error message={error.profile_pic} />}
          </div>
          <Button onClick={handleSignUp}>
            {loading ? <BeatLoader size={10} /> : "Signup"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
