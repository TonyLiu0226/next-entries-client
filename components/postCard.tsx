'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState, useEffect } from 'react'
import {Card} from 'flowbite-react'
import {Button} from 'flowbite-react'
import {PostProps} from '../interfaces/postProps'

const PostCard = (props : PostProps) => {

    const router = useRouter();

    const isMoodPositive = () => {
        if (!props.mood) return false // no mood means bad mood lol
        if (props.mood.includes("positive")) {
            return true
        }
        else return false
    }
    return(
        <Card className={isMoodPositive() ? "max-w-xl my-5 bg-green-400" : "max-w-xl my-5 bg-red-400"}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.date.split(':')[0].slice(0, -2)}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {props.content.length > 500 ? props.content.slice(0, 500) : props.content}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Posted on: {new Date((props.id)).toString()}
        </p>
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
      </Card>
    )
  }
  
  export default PostCard