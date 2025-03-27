'use client'

import { useRouter } from 'next/navigation';
interface LoginProps {
  children: React.ReactNode;
  mode: 'model' | 'redirect';
  asChild?: boolean;

  
}

export const LoginButton = ({children, mode='redirect', asChild}: LoginProps) => {

  const router = useRouter();
  const onClick = () => {
    if(mode === 'model'){
      console.log('model');
    }else{
      router.push('/login')
    }
  }
  return (
    <span onClick = {onClick} className='cursor-pointer'>
      {children}
    </span>
  )
}