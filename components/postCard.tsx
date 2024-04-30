'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState, useEffect } from 'react'
import {Card} from 'flowbite-react'
import {Button} from 'flowbite-react'
import {PostProps} from '../interfaces/postProps'
import DeleteButton from './deleteButton'

const PostCard = (props : PostProps) => {

    const router = useRouter();

    const deletePost = (id: Number, user:string) => {
      try {
        console.log(user)
        const result = fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE}delete_post`, {
          method: 'DELETE',
          headers:{'content-type': 'application/json'},
          body: JSON.stringify({
            user: user,
            id: id
          }),
        })
        return result;
      }
      catch(e) {
        console.error(e);
        return e;
      }
    }

    const isMoodPositive = () => {
        if (!props.mood) return false // no mood means bad mood lol
        if (props.mood.includes("positive")) {
            return true
        }
        else return false
    }
    return(
        <Card className={isMoodPositive() ? "max-w-xl my-5 bg-green-400 dark:bg-emerald-300" : "max-w-xl my-5 bg-red-400 dark:bg-pink-400"}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.date.split(':')[0].slice(0, -2)}
        </h5>
        <p className="font-normal text-gray-700 dark:text-white">
          {props.content.length > 500 ? props.content.slice(0, 500) : props.content}
        </p>
        <p className="font-normal text-gray-700 dark:text-white">
          Posted on: {new Date((props.id)).toString()}
        </p>
        <div className="flex flex-row justify-evenly">
        <Button onClick={() => {router.push(`/entry/${props.id}`)}}>
          Read more
          <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        <DeleteButton content={props.content} date={props.date} id={props.id} user={props.user} mood={props.mood}></DeleteButton>
        </div>
      </Card>
    )
  }
  
  export default PostCard