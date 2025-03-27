'use client'
import {Button} from '@/components/ui/button';
import CardWrapper from "@/components/auth/card-wrapper";
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {signupSchema} from '@/../schemas/index';
import {z} from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {signup} from '@/../actions/signup';
import {Input} from '@/components/ui/input';
import {useState} from 'react';
import {FormResult} from '@/components/auth/form-result';

const SignupForm = () => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      name:''
    }
  });

  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    setSuccess('');
    setError('');
    signup(values).then(
      (data) => {
        setSuccess(data.success);
        setError(data.error);
      }
    );
  };
  
  return (
    <CardWrapper 
      headerLabel="Signup" 
      backButtonLabel="Already have an account?" 
      backButtonHref="/login" 
      showSocial={true}>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} 
                    placeholder='Riley'
                    type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
          <Button 
            className='w-full'
            type='submit'>
            Signup
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SignupForm;