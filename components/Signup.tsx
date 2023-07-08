'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import Form from 'flowbite-react'
import Firebase from '../firebase/firebase';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

//initializes firebase auth instance
const auth = getAuth(Firebase)

const Signup = () => {
  //form fields
  let [firstName, setFirstName] = useState<string>("")
  let [lastName, setLastName] = useState<string>("")
  let [email, setEmail] = useState<string>("")
  let [password1, setPassword1] = useState<string>("")
  let [password2, setPassword2] = useState<string>("")

  //error flags
  let [errors, setErrors] = useState<string[]>([])
  let [submitError, setSubmitError] = useState<boolean>(false)

  //functions to change field values
  const changeFirstName = (e: any) => {
    setFirstName(e.target.value);
  }

  const changeLastName = (e: any) => {
    setLastName(e.target.value);
  }

  const changeEmail = (e: any) => {
    setEmail(e.target.value);
  }

  const changePassword1 = (e: any) => {
    setPassword1(e.target.value);
  }

  const changePassword2 = (e: any) => {
    setPassword2(e.target.value);
  }

  //validation logic to ensure all fields are valid
  const validateFields = useEffect(()=> {
    let newErrors : string[] = []
    if (firstName.length < 1 || firstName.length > 64) {
      newErrors.push("firstName")
    }
    if (lastName.length < 1 || lastName.length > 64) {
      newErrors.push("lastName")
    } 
    if (email.length < 5 || email.length > 256 || !((/[a-z0-9]+@[a-z]+\.[a-z]{2,5}/).test(email))) {
      newErrors.push("email")
    }
    if (password1.length < 8) {
      newErrors.push("passwordTooShort")
    }
    if (!((/[a-z]/).test(password1))) {
      newErrors.push("noLowercase")
    }
    if (!((/[A-Z]/).test(password1))) {
      newErrors.push("noUppercase")
    }
    if (!((/[0-9]/).test(password1))) {
      newErrors.push("noNumber")
    }
    if (password1 != password2) {
      newErrors.push("passwordsNotMatching")
    }
    console.log(newErrors)
    setErrors(newErrors)
  }, [firstName, lastName, email, password1, password2])

  //signs up and creates the account
  const signup = async() => {
    //verifies that all fields are filled out correctly
    if (errors.length) {
      console.error("failed to submit")
      setSubmitError(true)
    }
    else {
      //in the future, save the user's name along with its UID to the main database
      try {
        let result = await createUserWithEmailAndPassword(auth, email, password1)
        console.log(result)
        setSubmitError(false)
      }
      catch (e) {
        console.error(e)
        setSubmitError(true)
      }
    }
  }

  return(
    <div className="px-20 z-0 w-full min-h-screen min-w-screen items-center flex-col justify-center align-center font-mono text-sm lg:flex">
        <h1 className="font-mono font-bold text-5xl mt-10 mb-5">Sign up for an account</h1>
    <div className="max-w-5xl pt-5 px-5">
    <form>
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-6 group">
        <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={firstName} onChange={changeFirstName} required />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
        {errors.includes("firstName") &&
        <h3 className="font-mono font-bold text-sm text-red-500">First Name must be 1-64 characters long</h3>}
    </div>
    
    <div className="relative z-0 w-full mb-6 group">
        <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={lastName} onChange={changeLastName} required />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
        {errors.includes("lastName") &&
        <h3 className="font-mono font-bold text-sm text-red-500">Last Name must be 1-64 characters long</h3>}   
    </div>
    
  </div>
  <div className="relative z-0 w-full mb-6 group">
      <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={email} onChange={changeEmail} required />
      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
      {errors.includes("email") &&
        <h3 className="font-mono font-bold text-sm text-red-500">Please enter a valid email address</h3>}
  </div>
  <div className="relative z-0 w-full mb-6 group">
      <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={password1} onChange={changePassword1} required />
      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
      {errors.includes("passwordTooShort") &&
        <h3 className="font-mono font-bold text-sm text-red-500">Password must be 8 or more characters long</h3>}
      {errors.includes("noLowercase") &&
        <h3 className="font-mono font-bold text-sm text-red-500">Password must contain 1 or more lowercase letters</h3>}
        {errors.includes("noUppercase") &&
        <h3 className="font-mono font-bold text-sm text-red-500">Password must contain 1 or more uppercase letters</h3>}
        {errors.includes("noNumber") &&
        <h3 className="font-mono font-bold text-sm text-red-500">Password must contain 1 or more numbers</h3>}
  </div>
  <div className="relative z-0 w-full mb-6 group">
      <input type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={password2} onChange={changePassword2} required />
      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
      {errors.includes("passwordsNotMatching") &&
        <h3 className="font-mono font-bold text-sm text-red-500">Passwords don't match</h3>}
  </div>
</form>
<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={signup}>Submit</button>
{submitError &&
        <h3 className="font-mono font-bold text-2xl text-red-500">Something went wrong when creating your account, please try again</h3>}
</div>
</div>
  )
}

export default Signup