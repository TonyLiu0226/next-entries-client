'use client'

import { useRouter } from 'next/navigation'
import {AuthContext } from '../../authContext'
import React, {useContext, useState, useEffect} from 'react'
import { Card } from 'flowbite-react';


export default function Entry() {
    //protected page, for logged in users only
    const router = useRouter();
    const slug = window.location.pathname.split('/').pop();
    const user = useContext(AuthContext);
    if (user.user == null) {
      router.push("/");
    }

    const [date, setDate] = useState('');
    const [content, setContent] = useState('');
    const [mood, setMood] = useState('');
    const [character, setCharacter] = useState('');
    const [id, setId] = useState(0);


    //get entry data
    const fetchData = () => {
      //make sure path is valid:
        if (window.location.pathname.includes('entry')) {
          fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE}retrieve_by_id?user=${user.user.uid}&id=${slug}`)
          .then((res) => res.json())
          .then((data) => {
            if (!data[0].date || !data[0].content || !data[0].mood || !data[0].id) {
                throw new Error(`no data found for ${slug}`)
            }
            else {
                setDate(data[0].date);
                setContent(data[0].content);
                setMood(data[0].mood);
                setCharacter(data[0].character);
                setId(data[0].id);
            }
          })
          .catch((e) => {
            console.error(e);
            setDate("");
            setContent("");
            setMood("");
            setCharacter("");
            setId(-1);
          })
        }
      }
   
      useEffect(() => {
        fetchData()
      }, [slug])

    return (
      <div className='flex flex-column justify-center'>
        {window.innerWidth > 960 ? <Card className={mood == "positive" ? "max-w-sm my-5 bg-green-400 dark:bg-emerald-300" : "max-w-sm my-5 bg-red-400 dark:bg-pink-400"} imgSrc={`/${character}.png`} horizontal>
        {id !== -1 ? (
            <>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                {date.split(':')[0].slice(0, -2)}
            </h5>
            <p className="text-lg font-bold tracking-tight text-gray-800">
                Posted on: {new Date(id).toString()}
            </p>
            <p className="text-lg font-bold tracking-tight text-gray-800">
                Mood: {mood}
            </p>
            <p className="font-normal text-gray-700">
                {content}
            </p>
            </>
        ) : (
            <p>No content found for {slug}</p>
        )}
</Card> : 
<Card className={mood == "positive" ? "max-w-sm my-5 bg-green-400 dark:bg-emerald-300" : "max-w-sm my-5 bg-red-400 dark:bg-pink-400"} imgSrc={`/${character}.png`}>
        {id !== -1 ? (
            <>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                {date.split(':')[0].slice(0, -2)}
            </h5>
            <p className="text-lg font-bold tracking-tight text-gray-800">
                Posted on: {new Date(id).toString()}
            </p>
            <p className="text-lg font-bold tracking-tight text-gray-800">
                Mood: {mood}
            </p>
            <p className="font-normal text-gray-700">
                {content}
            </p>
            </>
        ) : (
            <p>No content found for {slug}</p>
        )}
</Card>}
        
</div>
    )
  }