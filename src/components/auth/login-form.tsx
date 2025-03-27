"use client"
import {Button} from '@/components/ui/button';
import CardWrapper from "@/components/auth/card-wrapper";
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginSchema} from '@/../schemas/index';
import {z} from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {login} from '@/../actions/login';
import {Input} from '@/components/ui/input';
import {useState} from 'react';
import {FormResult} from '@/components/auth/form-result';
const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const [error,setError] =useState<string | undefined>(undefined);
  const [success,setSuccess] =useState<string | undefined>(undefined);


  const onSubmit =  (values: z.infer<typeof loginSchema>) => {
    setSuccess('');
    setError('');
    login(values).then(
      (data) => {
        setSuccess(data.success);
        setError(data.error);
      }
    )
  }

  return(
    <CardWrapper 
      headerLabel="Login" 
      backButtonLabel="Dont have an account?" 
      backButtonHref="/register" 
      showSocial={true}>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} 
                    placeholder='Riley@example.com'
                    type='email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} 
                      placeholder='******'
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
            <FormResult type='error' message={error}/>
            <FormResult type='success' message={success} />
            </div>

          </div>
          <button type="submit" className="w-full bg-black text-white p-2 rounded">
            Login
          </button>
        </form>
      </Form>
    </CardWrapper>
  )  
  
  
}

export default LoginForm;