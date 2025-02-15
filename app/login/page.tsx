// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessages({});
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/login", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (!res.ok) {
      // Display errors returned from the API
      setErrorMessages(data.error || {});
      setLoading(false);
    } else {
      // Successful login: redirect to the dashboard
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 text-gray-900 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errorMessages.email && (
              <p className="mt-1 text-red-500 text-sm">{errorMessages.email.join(", ")}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 text-gray-900 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errorMessages.password && (
              <p className="mt-1 text-red-500 text-sm">{errorMessages.password.join(", ")}</p>
            )}
          </div>
          {errorMessages.credentials && (
            <div className="text-red-500 text-sm text-center">
              {errorMessages.credentials.join(", ")}
            </div>
          )}
          {errorMessages.general && (
            <div className="text-red-500 text-sm text-center">
              {errorMessages.general.join(", ")}
            </div>
          )}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
