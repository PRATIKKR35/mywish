import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getTemplateById } from '../../lib/templates';
import { Copy, Share2, Check } from 'lucide-react';

export default function CreateGreeting() {
  const router = useRouter();
  const { id } = router.query;
  const [template, setTemplate] = useState(null);
  const [customMessage, setCustomMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      const tmpl = getTemplateById(id);
      setTemplate(tmpl);
      setCustomMessage(tmpl?.message || '');
    }
  }, [id]);

  const handleCreate = async () => {
    if (!template) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/greetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({
          templateId: template.id,
          category: router.query.category || 'birthday',
          customMessage,
          recipientName
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setShareUrl(data.greeting.shareUrl);
      } else {
        alert(data.message || 'Failed to create greeting');
      }
    } catch (error) {
      console.error('Error creating greeting:', error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!template) return null;

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
          <Link href="/">
            <span className="text-slate-600 hover:text-slate-800 transition-colors cursor-pointer">
              ← Back
            </span>
          </Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-light text-slate-800 mb-2">
            Customize Your Greeting
          </h1>
          <p className="text-slate-600 font-light">
            Personalize this beautiful template
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-light text-slate-800 mb-4">Preview</h2>
            <div className="sticky top-8">
              <div className={`bg-gradient-to-br ${template.gradient} rounded-2xl p-12 shadow-2xl min-h-[500px] flex flex-col items-center justify-center text-center relative overflow-hidden`}>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
                  <div className="absolute inset-0 border-t-4 border-l-4 rounded-tl-3xl" style={{ borderColor: template.accentColor }} />
                </div>
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
                  <div className="absolute inset-0 border-b-4 border-r-4 rounded-br-3xl" style={{ borderColor: template.accentColor }} />
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="text-8xl mb-6"
                >
                  {template.icon}
                </motion.div>
                
                {recipientName && (
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-serif italic mb-4"
                    style={{ color: template.accentColor }}
                  >
                    Dear {recipientName},
                  </motion.h3>
                )}
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-light leading-relaxed"
                  style={{ color: template.accentColor }}
                >
                  {customMessage}
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-light text-slate-800 mb-4">Personalize</h2>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-stone-200/50 shadow-md">
              {!shareUrl ? (
                <>
                  <div className="mb-6">
                    <label className="block text-slate-700 font-light mb-2">
                      Recipient Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g., Sarah"
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white/80 font-light"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-slate-700 font-light mb-2">
                      Your Message
                    </label>
                    <textarea
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white/80 font-light resize-none"
                    />
                    <p className="text-sm text-slate-500 mt-2 font-light">
                      {customMessage.length} characters
                    </p>
                  </div>

                  <button
                    onClick={handleCreate}
                    disabled={loading || !customMessage.trim()}
                    className="w-full px-6 py-4 bg-gradient-to-r from-amber-400 to-yellow-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-light disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <span>Creating...</span>
                    ) : (
                      <>
                        <Share2 size={20} />
                        <span>Create & Share</span>
                      </>
                    )}
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-light text-slate-800 mb-2">
                    Greeting Created!
                  </h3>
                  <p className="text-slate-600 font-light mb-6">
                    Share this link with your loved ones
                  </p>
                  
                  <div className="bg-slate-100 rounded-lg p-4 mb-4 flex items-center justify-between">
                    <span className="text-sm text-slate-600 truncate flex-1 mr-2 font-mono">
                      {shareUrl}
                    </span>
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors flex items-center space-x-2"
                    >
                      {copied ? (
                        <>
                          <Check size={16} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex space-x-4">
                    <Link href={shareUrl.replace(process.env.NEXT_PUBLIC_APP_URL || '', '')}>
                      <button className="flex-1 px-6 py-3 border border-stone-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-light">
                        View Greeting
                      </button>
                    </Link>
                    <Link href="/">
                      <button className="flex-1 px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors font-light">
                        Create Another
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}