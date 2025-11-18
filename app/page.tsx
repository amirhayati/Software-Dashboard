// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'AmirReza' && password === 'AmirRezaMoazeni135') {
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500">
      <div className="bg-white/95 backdrop-blur-sm p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-800 font-medium mb-2">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black placeholder-gray-500 bg-white"
            />
          </div>
          <div>
            <label className="block text-gray-800 font-medium mb-2">رمز عبور</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black placeholder-gray-500 bg-white"
            />
          </div>
          <div className="flex items-center justify-between">
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}