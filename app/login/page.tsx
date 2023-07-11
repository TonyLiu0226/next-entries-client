'use client'

import Login from '../../components/Login'
import { useRouter } from 'next/navigation'
import {AuthContext } from '../authContext'
import React, {useContext} from 'react'

export default function Home() {

  //protected page, only loads when user is not logged in
    const router = useRouter()
    const user = useContext(AuthContext)
    if (user.user) {
      router.push("/dashboard")
    }
    return (
      <Login></Login>
    )
  }
