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

    useEffect(() => {
      fetch(process.env.NEXT_PUBLIC_SERVER_BASE + "retrieve_before_timestamp?user=j9z4KEQrE0gDfIj8atdcftXp5z92")
        .then((res) => res.json())
        .then((data) => {
          let time = data.pop()
          console.log(data)
          setPostData(data)
        })
    }, [])

    return (
      <div className="mt-40">
          <h1 className="font-mono font-bold text-5xl mt-10 mb-5">My Posts</h1>
          {postData ? postData.map((e: PostProps) => (
              <PostCard key={uuidv4()} content={e.content} date={e.date} mood={e.mood}></PostCard>
          )) : <></>}
      </div>
  );
  }