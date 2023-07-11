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
          <h1 className="font-mono font-bold text-7xl mt-10 mb-5">Dashboard</h1>
          <h4 className="font-mono text-xl mt-5 mb-5">Never gonna give you up, never gonna let you down, never gonna turn around and desert you</h4>
          <h4 className="font-mono text-lg mt-5 mb-5">Never gonna make you cry, never gonna say goodbye, never gonna tell a lie and hurt you</h4>
        </div>
      </div>
    )
  }