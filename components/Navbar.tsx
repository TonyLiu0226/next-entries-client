'use client'

import Navbar from "flowbite-react"
import Link from "next/link"
import {AuthContextProvider, AuthContext} from '../app/authContext'
import {
    getAuth,
    signOut,
} from 'firebase/auth';
import Firebase from '../firebase/firebase';

import {useContext, useEffect, useState} from 'react'
import { useInterval } from 'usehooks-ts'

import { Collapse } from "flowbite";
import type { CollapseOptions, CollapseInterface } from "flowbite";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMoon} from '@fortawesome/free-solid-svg-icons'
import {faSun} from '@fortawesome/free-regular-svg-icons'

const NavMenu = () => {

        //sets up interface to allow user menu and mobile navbar dropdowns to work
            const [timer, setTimer] = useState<boolean>(false)
            const [collapseCreated, setCollapseCreated] = useState<boolean>(false)

            useInterval(() => {
                setTimer(true)
            }, 1000)

            useEffect(() => {
            const initializeCollapse = () => {
                if (collapseCreated == false) {
                    const userDropdownEl = document.getElementById('user-dropdown')
                    const userDropdownTrigger = document.getElementById('user-menu-button')
                    const mobileEl = document.getElementById('navbar-sticky')
                    const mobileTrigger = document.getElementById('mobile')
                    const options: CollapseOptions = {
                        onCollapse: () => {
                            console.log('element has been collapsed')
                        },
                        onExpand: () => {
                            console.log('element has been expanded')
                        },
                        onToggle: () => {
                            console.log('element has been toggled')
                        }
                    };
                    if (userDropdownEl && userDropdownTrigger && mobileEl && mobileTrigger) {
                        const collapse: CollapseInterface = new Collapse(userDropdownEl, userDropdownTrigger, options);
                        const collapse2: CollapseInterface = new Collapse(mobileEl, mobileTrigger, options);
                        setCollapseCreated(true)
                        console.log(userDropdownEl)
                        console.log(userDropdownTrigger)
                        console.log(mobileEl)
                        console.log(mobileTrigger)
                    }
                }
            }
            initializeCollapse()
            
        }, [timer])
    
        //gets user from our AuthContext
        const user = useContext(AuthContext)
        console.log(user)

        //variables that affect toggling theme (light/dark modes)
        const [mounted, setMounted] = useState(false);
        const { theme, setTheme } = useTheme();

        useEffect(() => {
            setMounted(true);
          }, []);
        
        
          if (!mounted) {
            return null;
          }

        //initializes our firebase auth and next router
        const auth = getAuth(Firebase);
        const router = useRouter()

        const signOutUser = async() => {
            try {
                await signOut(auth)
                //navigates back to home page
                router.push("/")
            }
            catch (e) {
                console.error(e)
            }
        }

        //conditionally renders navbars based on authentication status
        if (user.user == null) {
            return(
                <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                    <script src="https://kit.fontawesome.com/a1540a5ac8.js"></script>
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a href="/" className="flex items-center">
                            <img src="moodsense_logo_partial.png" className="w-36 h-12 mr-1" alt="MoodSense" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
                        </a>
                            <button
                                className={`rounded-md hover:scale-110 active:scale-100 `}
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            >
                                {theme === "light" ? <FontAwesomeIcon icon={faMoon}/> : <FontAwesomeIcon icon={faSun} style={{color: "#f9f0f0",}}/>}
                            </button>

                        <div className="flex md:order-2">
                            <Link href="/signup">
                                <button type="button" className="mx-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Sign up
                                </button>
                            </Link>
                            <Link href="/login">
                                <button type="button" className="mx-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Login
                                </button>    
                            </Link>
                            
                        </div>
  
                    </div>
                </nav>
            )
        } else {
            return(
                <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                    <script src="https://kit.fontawesome.com/a1540a5ac8.js"></script>
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center">
                            <img src="moodsense_logo_partial.png" className="w-36 h-12 mr-1" alt="MoodSense" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
                        </a>
                        <div className="flex items-center md:order-2">
                            <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                <span className="sr-only">Open user menu</span>
                                <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
                            </button>
                        {/* <!-- Dropdown menu --> */}
                        <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">{user.user.name}</span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user.user.email}</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={signOutUser}>Sign out</button>
                                </li>
                            </ul>
                        </div>
                        {/* button to toggle mobile navbar dropdown */}
                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false" id="mobile">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                    </div>
                    {/* navbar menu items */}
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="/dashboard" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Dashboard</a>
                            </li>
                            <li>
                                <a href="/post" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Post</a>
                            </li>
                            <li>
                                <a href="/calendar" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Calendar</a>
                            </li>
                            <li>
                                <button
                                className={`rounded-md hover:scale-110 active:scale-100 `}
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                >
                                    {theme === "light" ? <FontAwesomeIcon icon={faMoon}/> : <FontAwesomeIcon icon={faSun} style={{color: "#f9f0f0",}}/>}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            )
        }
}

export default NavMenu