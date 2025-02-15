// app/api/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  (await cookieStore).set({
    name: 'currentUser',
    value: '',
    path: '/',
    expires: new Date(0), // Expire the cookie immediately
  });
  return NextResponse.json({ success: true });
}
