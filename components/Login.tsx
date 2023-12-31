'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import Form from 'flowbite-react'
import Firebase from '../firebase/firebase';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

//initializes authentication instance
const auth = getAuth(Firebase)


const Login = () => {

  const router = useRouter()

  //form fields
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  //error flags
  const [loginError, setLoginError] = useState(false)

  //functions to update fields on change
  const changeEmail = (e: any) => {
    setEmail(e.target.value)
  }

  const changePassword = (e:any) => {
    setPassword(e.target.value)
  }

  //queries our firebase authentication service to login the user
  const login = async() => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      console.log(result)
      setLoginError(false)
      router.push('/dashboard')
    }
    catch (e) {
      console.log(e)
      setLoginError(true)
    }
  }

  return(
    <div className="px-20 z-0 w-full min-h-screen min-w-screen items-center flex-col justify-center align-center font-mono text-sm lg:flex">
        <h1 className="font-mono font-bold text-5xl mt-10 mb-5">Log in</h1>
    <div className="max-w-5xl pt-5 px-5">
    <form>
  <div className="relative z-0 w-full min-w-5xl mb-6 group">
      <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={email} onChange={changeEmail} required />
      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div className="relative z-0 w-full min-w-5xl mb-6 group">
      <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={password} onChange={changePassword} required />
      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
</form>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={login}>Submit</button>
    {loginError && <h3 className="font-mono font-bold text-2xl text-red-500">LOGIN ERROR: Email and/or password is not correct</h3>}
</div>
</div>
  )
}

export default Login