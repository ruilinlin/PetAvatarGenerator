import * as z from 'zod' ;


export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1,{ message: 'password is required'}),

});

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6,{ message: 'password is at least 6 characters'}),
  name:z.string().min(1,{message: 'name is required'})

});