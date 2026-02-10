import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, Copy, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { getTemplateById } from '../lib/templates';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [greetings, setGreetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/auth/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchGreetings(token);
  }, []);

  const fetchGreetings = async (token) => {
    try {
      const response = await fetch('/api/greetings', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (response.ok) {
        setGreetings(data.greetings);
      }
    } catch (error) {
      console.error('Error fetching greetings:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyShareUrl = (shareId) => {
    const url = `${window.location.origin}/view/${shareId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(shareId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-stone-200/50 backdrop-blur-sm bg-white/30">
        <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-lg">
                W
              </div>
              <span className="text-2xl font-light tracking-wider text-slate-800">
                My<span className="font-semibold">Wish</span>
              </span>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-slate-600 font-light">Hello, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-light text-slate-800 mb-4">Your Greetings</h1>
          <p className="text-slate-600 font-light text-lg">
            All the beautiful greetings you've created
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600 font-light">Loading your greetings...</p>
          </div>
        ) : greetings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">✨</div>
            <h2 className="text-3xl font-light text-slate-800 mb-4">No greetings yet</h2>
            <p className="text-slate-600 font-light mb-8">
              Start creating beautiful greetings to share with your loved ones
            </p>
            <Link href="/">
              <button className="px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-light">
                Create Your First Greeting
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {greetings.map((greeting, index) => {
              const template = getTemplateById(greeting.templateId);
              if (!template) return null;

              return (
                <motion.div
                  key={greeting._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-stone-200/50 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {/* Preview */}
                  <div className={`h-48 bg-gradient-to-br ${template.gradient} flex items-center justify-center relative`}>
                    <div className="text-5xl">{template.icon}</div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-light text-slate-800 mb-2">
                      {template.title}
                    </h3>
                    {greeting.recipientName && (
                      <p className="text-slate-600 text-sm mb-2">
                        To: <span className="font-normal">{greeting.recipientName}</span>
                      </p>
                    )}
                    <p className="text-slate-500 text-sm mb-4 font-light">
                      Created {format(new Date(greeting.createdAt), 'MMM d, yyyy')}
                    </p>

                    <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                      <span className="flex items-center space-x-1">
                        <Eye size={16} />
                        <span>{greeting.views || 0} views</span>
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Link href={`/view/${greeting.shareId}`}>
                        <button className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors flex items-center justify-center space-x-2">
                          <ExternalLink size={16} />
                          <span>View</span>
                        </button>
                      </Link>
                      <button
                        onClick={() => copyShareUrl(greeting.shareId)}
                        className="px-4 py-2 border border-stone-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                        title="Copy share link"
                      >
                        {copiedId === greeting.shareId ? (
                          <span className="text-green-600">✓</span>
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}