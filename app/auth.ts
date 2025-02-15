// app/auth.ts
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

// The secret key for signing and verifying JWT tokens.
// In production, store this securely in an environment variable.
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * signIn authenticates a user using hardcoded credentials.
 * If successful, it generates a JWT token with a 1-hour expiration
 * and stores it in an HTTP-only cookie.
 *
 * @param {FormData} formData - Contains 'email' and 'password' from the login form.
 * @throws {Error} If credentials are invalid.
 */
export async function signIn(formData: FormData) {
  // Extract email and password from the form data.
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  // Dummy authentication: Accept only the fixed email and password.
  if (email === 'user@example.com' && password === 'password') {
    // Define the payload for the JWT.
    const payload = { email, role: 'user' };

    // Generate a JWT token that expires in 1 hour.
    // TextEncoder converts the secret into a Uint8Array as required by jose.
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(JWT_SECRET));

    // Set the token in an HTTP-only cookie.
    const cookieStore = cookies();
    (await cookieStore).set({
      name: 'currentUser',
      value: token,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // secure in production
      maxAge: 60 * 60, // 1 hour in seconds
    });
    return;
  } else {
    // If credentials are invalid, throw an error.
    const error: any = new Error('Invalid credentials');
    error.type = 'CredentialsSignin';
    throw error;
  }
}

/**
 * getSession retrieves and verifies the JWT token from cookies.
 * If valid, returns the decoded payload.
 *
 * @returns {object|null} The decoded payload (user data) or null if verification fails.
 */
export async function getSession() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('currentUser')?.value;
  if (!token) return null;
  try {
    // Verify the token using jose.
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return { user: payload };
  } catch (error) {
    // Return null if token verification fails.
    return null;
  }
}
