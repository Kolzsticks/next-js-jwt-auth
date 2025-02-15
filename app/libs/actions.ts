// app/lib/actions.ts
'use server';

import { signIn } from '@/app/auth';
import { redirect } from 'next/navigation';

export async function authenticate(formData: FormData) {
  try {
    await signIn(formData);
  } catch (error: any) {
    if (error && error.type === 'CredentialsSignin') {
      throw new Error('Invalid credentials.');
    }
    throw new Error('Something went wrong.');
  }
  // Redirect after successful sign-in (ensure the URL is spelled correctly)
  redirect('/dashboard');
}
