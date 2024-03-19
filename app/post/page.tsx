'use client'

import { useRouter } from 'next/navigation'
import {AuthContext } from '../authContext'
import React, {useContext, useState} from 'react'
import { Alert } from 'flowbite-react';


export default function Home() {
    //protected page, for non logged in users only
    const router = useRouter()
    const user = useContext(AuthContext)
    if (user.user == null) {
      router.push("/")
    }

    //state vars for updating content and date
    let [date, setDate] = useState('')
    let [content, setContent] = useState('')
    let [charsRemaining, setCharsRemaining] = useState(4000)
    let [error, setError] = useState('')
    let [success, setSuccess] = useState(false)

    const disableButton = async() => {
      let button = document.getElementById('postButton');
      if (button) {
        button.style.display = 'none';
        await new Promise((r: any) => {setTimeout(r, 1000)});
        button.style.display = 'block';
      }
    }

    const post = async() => {
      if (date && content) {
        try {
          const body = {
            user: user.user.uid,
            date: date,
            content: content
          }
          let response = await fetch (`${process.env.NEXT_PUBLIC_SERVER_BASE}add_entry/`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
          })
          //alert success
          setError('');
          setSuccess(true);
          //disable post button for 1s
          disableButton();
          return response;
        }
        catch (e) {
          //alert failure
          setSuccess(false);
          setError("Encountered error trying to post entry, please try again later!");
          console.error(e);
        }
      }
      else {
        setSuccess(false);
        setError('Please fill out all fields!');
      }
    }

    const changeDate = (e: any) => {
      setDate(e.target.value)
    }

    const changeContent = (e: any) => {
      setContent(e.target.value)
      setCharsRemaining(4000 - e.target.value.length)
    }

    return (
      <div>
        {error.length ? <Alert color="failure" className="mt-20" onDismiss={() => {setError('')}}>
          <span className="font-medium">{error}</span>
        </Alert>: <></>}
        {success ? <Alert color="success" className="mt-20" onDismiss={() => {setSuccess(false)}}>
          <span className="font-medium">Successfully added journal entry for {date}</span>
        </Alert>: <></>}
        <div className="px-20 z-0 w-full min-h-screen min-w-screen items-center flex-col justify-center align-center font-mono text-sm lg:flex">
          <h1 className="font-mono font-bold text-7xl mt-10 mb-5">Make a post!</h1>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">Select date</label>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
              </div>
            <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" min="2000-01-01" max="2099-12-31" onChange={changeDate}/>
          </div>
            <textarea id="message" rows={4} className="mt-10 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." onChange={changeContent} maxLength={4000}></textarea>
            <h3 className="text-red-700">{charsRemaining == 0 ? "Please limit posts to 4000 characters or less" : ""}</h3>
            <button type="button" id='postButton' className="py-2.5 px-5 mr-2 mb-2 mt-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={post}>Post</button>
        </div>
      </div>
    )
  }