// app/dashboard/LogoutButton.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    // Call the logout API route to clear the cookie
    await fetch('/api/logout', { method: 'POST' });
    // Redirect to the login page after logout
    router.push('/login');
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
    >
      Log Out
    </button>
  );
}
