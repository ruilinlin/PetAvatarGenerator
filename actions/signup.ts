'use server';
import {signupSchema} from '@/../schemas/index';
import {z} from 'zod';
export const signup = async (formData: z.infer<typeof signupSchema>) => {
  const parsedData = signupSchema.safeParse(formData);

  if (!parsedData.success) {
    return{
      error:'invalid data'
    }
  } 
  return{
    success: 'Signup successful'
  }
  
}