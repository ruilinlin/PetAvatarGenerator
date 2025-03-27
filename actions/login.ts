'use server';
import {loginSchema} from '@/../schemas/index';
import {z} from 'zod';
export const login = async (formData: z.infer<typeof loginSchema>) => {
  const parsedData = loginSchema.safeParse(formData);

  if (!parsedData.success) {
    return{
      error:'invalid data'
    }
  } 
  return{
    success: 'Login successful'
  }
  

}