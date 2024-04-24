'use client'
import { useRouter } from 'next/navigation'
import {AuthContext } from '../authContext'
import React, {useContext, useEffect, useState} from 'react'
import PostCard from '../../components/postCard'
import {PostProps} from '../../interfaces/postProps'
import { v4 as uuidv4 } from 'uuid';

export default function DashBoard(
) {
    //protected page, for logged in users only
    const router = useRouter()
    const user = useContext(AuthContext)
    if (user.user == null) {
      router.push("/")
    }

    const [postData, setPostData] = useState<any[]>([])
    const [timestamp, setTimestamp] = useState<number>(0)

    const fetchData = () => {
      fetch(timestamp > 0 ?`${process.env.NEXT_PUBLIC_SERVER_BASE}retrieve_before_timestamp?user=${user.user.uid}&timestamp=${timestamp.toString()}`
      :`${process.env.NEXT_PUBLIC_SERVER_BASE}retrieve_before_timestamp?user=${user.user.uid}`)
        .then((res) => res.json())
        .then((data) => {
          let time = data.pop();
          let updatedData = postData;
          for (let i = 0; i < data.length; i++) {
            updatedData.push(data[i]);
          }
          setPostData(updatedData);
          if (time) {
            setTimestamp(time);
          }
        })
    }
 
    useEffect(() => {
      fetchData()
    }, [])

    const handleScroll = (event: any) => {
      //checks for if user has scrolled to bottom
      if (Math.ceil(event.target.scrollTop + event.target.clientHeight) >= event.target.scrollHeight) {
        fetchData()
      }
    }

    return (
      <div className="mt-40 flex flex-col items-center">
        <div>
          <h1 className="font-mono font-bold text-5xl mt-10 mb-5 text-center">My Posts</h1>
        </div>
        <div className="overflow-y-scroll h-screen" onScroll={handleScroll}>
            {postData ? postData.map((e: PostProps) => (
                <PostCard key={uuidv4()} content={e.content} date={e.date} mood={e.mood} id={e.id}></PostCard>
            )) : <></>}
        </div>
      </div>
  );
  }