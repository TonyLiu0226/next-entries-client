'use client'

import Signup from '../../components/Signup'
import { useRouter } from 'next/navigation'
import {AuthContext } from '../authContext'
import React, {useContext} from 'react'

export default function Home() {
  //protected page, for non logged in users only
    const router = useRouter()
    const user = useContext(AuthContext)
    if (user.user) {
      router.push("/dashboard")
    }
    return (
      <Signup></Signup>
    )
  }
  