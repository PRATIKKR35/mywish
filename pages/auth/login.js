import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-slate-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <Link href="/">
            <div className="inline-flex items-center space-x-3 mb-6 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                W
              </div>
              <span className="text-3xl font-light tracking-wider text-slate-800">
                My<span className="font-semibold">Wish</span>
              </span>
            </div>
          </Link>
          <h1 className="text-4xl font-light text-slate-800 mb-2">Welcome Back</h1>
          <p className="text-slate-600 font-light">Login to continue creating</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-stone-200/50 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-slate-700 font-light mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white/80 font-light"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-light mb-2">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white/80 font-light"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-amber-400 to-yellow-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-light disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600 font-light">
              Don't have an account?{' '}
              <Link href="/auth/signup">
                <span className="text-amber-600 hover:text-amber-700 cursor-pointer font-normal">
                  Sign Up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}