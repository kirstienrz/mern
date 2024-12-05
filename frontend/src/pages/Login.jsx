// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import FacebookAuth from '../components/FacebookAuth';

// const Login = () => {

//   const [currentState, setCurrentState] = useState('Login');
//   const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

//   const [name,setName] = useState('')
//   const [password,setPassword] = useState('')
//   const [email,setEmail] = useState('')

  

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       if (currentState === 'Sign Up') {
        
//         const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
//         if (response.data.success) {
//           setToken(response.data.token)
//           localStorage.setItem('token',response.data.token)
//         } else {
//           toast.error(response.data.message)
//         }
//       } else {


//         const response = await axios.post(backendUrl + '/api/user/login', {email,password})
//         if (response.data.success) {
//           setToken(response.data.token)
//           localStorage.setItem('token',response.data.token)
//         } else {
//           toast.error(response.data.message)
//         }

//       }


      
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
      
//     }
//   }

//   useEffect(()=>{
//     if(token) {
//       navigate('/')
//     }

//   },[token])

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] s m:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
//       <div className='inline-flex items-center gap-2 mb-2 mt-10'>
//         <p className='prata-regular text-3xl'>{currentState}</p>
//         <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
//       </div>
//       {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/> }
//       <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
//       <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
//       <div className='w-full flex justify-between text-sm mt-[-8px]'>
//         <p className='cursor-pointer'>Forgot your password?</p>
//         {
//           currentState === 'Login'
//           ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
//           : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
//         }
//       </div>
//       <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
//       <FacebookAuth />
//     </form> 
//   )
// }


// export default Login


import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import FacebookAuth from '../components/FacebookAuth';

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [currentState, setCurrentState] = React.useState('Login');

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: currentState === 'Sign Up' ? Yup.string().required('Name is required') : Yup.string(),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (currentState === 'Sign Up') {
        // Sign up request
        const response = await axios.post(backendUrl + '/api/user/register', data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        // Login request
        const response = await axios.post(backendUrl + '/api/user/login', {
          email: data.email,
          password: data.password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while processing your request.');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === 'Sign Up' && (
        <>
          <input
            {...register('name')}
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
          />
          <p className="text-red-600 text-xs">{errors.name?.message}</p>
        </>
      )}
      <input
        {...register('email')}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
      />
      <p className="text-red-600 text-xs">{errors.email?.message}</p>
      <input
        {...register('password')}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
      />
      <p className="text-red-600 text-xs">{errors.password?.message}</p>
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
            Create Account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
      <FacebookAuth />
    </form>
  );
};

export default Login;

