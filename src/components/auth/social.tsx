"use client"

import { Button } from "../ui/button";
import {FcGoogle} from'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
import {FaApple} from 'react-icons/fa'

const Social = () => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <Button size={'lg'} className='w-full' variant={'outline'} onClick={() => {}}>
        <FcGoogle
        className="w-4 h-4 mr-2"
        />
        Continue with Google
      </Button>
      <Button size={'lg'} className='w-full' variant={'outline'} onClick={() => {}}>
        <FaGithub
        className="w-4 h-4 mr-2"
        />
        Continue with Github
      </Button>
      <Button size={'lg'} className='w-full' variant={'outline'} onClick={() => {}}>
        <FaApple
        className="w-4 h-4 mr-2"
        />
        Continue with Apple
      </Button>
    </div>
  )
}

export default Social;