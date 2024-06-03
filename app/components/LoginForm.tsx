'use client';
import { useState, FormEvent } from 'react';
import { createCredential } from '../lib/appleAuth';

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      onClose();
      const { user } = await res.json();
      createCredential(user);
    } else {
      const data = await res.json();
      setError(data.error || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl mb-4">Login</h2>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button style={{width: "100%"}} type="submit" className="bg-blue-500 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
