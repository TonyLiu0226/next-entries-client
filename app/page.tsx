'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {AuthContext } from './authContext'
import React, {useContext} from 'react'

export default function Home() {
  //protected page, for non logged in users only
    const router = useRouter()
    const user = useContext(AuthContext)
    if (user.user) {
      router.push("/dashboard")
    }
  return (
    <div>
      <div className="px-20 z-0 w-full min-h-screen min-w-screen items-center flex-col justify-center align-center font-mono text-sm lg:flex">
        <img src="moodsense_logo_full.png" className="w-1/3"/>
        <h4 className="font-mono text-l mt-5 mb-5">Unveiling your inner emotions, one entry at a time</h4>
      </div>
    </div>
  )
}
