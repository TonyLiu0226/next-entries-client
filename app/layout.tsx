import '../styles/globals.css'
import { Inter } from 'next/font/google'
import React from 'react'
import Navbar from 'flowbite-react'
import NavMenu from '../components/Navbar'
import Firebase from '../firebase/firebase'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {AuthContextProvider} from './authContext'

const inter = Inter({ subsets: ['latin'] })

//initialize firebase
try {
  const fb = Firebase;
  console.log(fb);
}
catch (e) {
  console.log("Error: " + e)
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={inter.className} >
        <AuthContextProvider>
          <NavMenu ></NavMenu>
          <main className="mt-16 min-h-screen bg-white">{children}</main>
        </AuthContextProvider>
      </body>
    </html>
  )
}