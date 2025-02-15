// app/dashboard/page.tsx
import { getSession } from '../auth';
import LogoutButton from '../components/LogoutButton';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    return <p>Access Denied. Please log in.</p>;
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow rounded p-6 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-black">Dashboard</h1>
        <p className="text-lg mb-6 text-black">Welcome, {session.user.email}!</p>
        <LogoutButton />
      </div>
    </div>
  );
}
