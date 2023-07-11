'use client'

import { useRouter } from 'next/navigation'
import {AuthContext } from '../authContext'
import React, {useContext} from 'react'

export default function Home() {
    //protected page, for non logged in users only
    const router = useRouter()
    const user = useContext(AuthContext)
    if (user.user == null) {
      router.push("/")
    }

    return (
      <div>
        <div className="px-20 z-0 w-full min-h-screen min-w-screen items-center flex-col justify-center align-center font-mono text-sm lg:flex">
          <h1 className="font-mono font-bold text-7xl mt-10 mb-5">Make a post!</h1>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
            <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        </div>
      </div>
    )
  }