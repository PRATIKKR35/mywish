import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { getTemplateById } from '../../lib/templates';
import Link from 'next/link';

export default function ViewGreeting() {
  const router = useRouter();
  const { shareId } = router.query;
  const [greeting, setGreeting] = useState(null);
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (shareId) {
      fetchGreeting();
    }
  }, [shareId]);

  const fetchGreeting = async () => {
    try {
      const response = await fetch(`/api/greetings/${shareId}`);
      const data = await response.json();
      
      if (response.ok) {
        setGreeting(data.greeting);
        const tmpl = getTemplateById(data.greeting.templateId);
        setTemplate(tmpl);
      }
    } catch (error) {
      console.error('Error fetching greeting:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-light">Loading your greeting...</p>
        </div>
      </div>
    );
  }

  if (!greeting || !template) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-slate-800 mb-4">Greeting Not Found</h1>
          <p className="text-slate-600 font-light mb-8">This greeting may have been removed or the link is incorrect</p>
          <Link href="/">
            <button className="px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-light">
              Create Your Own Greeting
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const getAnimationVariants = () => {
    switch (template.animation) {
      case 'fadeSlideUp':
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 }
        };
      case 'scaleIn':
        return {
          initial: { opacity: 0, scale: 0.5 },
          animate: { opacity: 1, scale: 1 }
        };
      case 'slideRight':
        return {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 }
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 }
        };
    }
  };

  const variants = getAnimationVariants();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-slate-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full"
      >
        <div className={`bg-gradient-to-br ${template.gradient} rounded-3xl p-16 shadow-2xl min-h-[600px] flex flex-col items-center justify-center text-center relative overflow-hidden`}>
          {/* Luxury decorative elements */}
          <div className="absolute top-0 left-0 w-48 h-48 opacity-10">
            <div className="absolute inset-0 border-t-8 border-l-8 rounded-tl-[3rem]" style={{ borderColor: template.accentColor }} />
          </div>
          <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10">
            <div className="absolute inset-0 border-b-8 border-r-8 rounded-br-[3rem]" style={{ borderColor: template.accentColor }} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5">
            <div className="absolute inset-0 border-4 rounded-full" style={{ borderColor: template.accentColor }} />
          </div>

          {/* Content */}
          <motion.div
            {...variants}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-9xl mb-8 relative z-10"
          >
            {template.icon}
          </motion.div>
          
          {greeting.recipientName && (
            <motion.h2
              {...variants}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl font-serif italic mb-6 relative z-10"
              style={{ color: template.accentColor }}
            >
              Dear {greeting.recipientName},
            </motion.h2>
          )}
          
          <motion.p
            {...variants}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-3xl font-light leading-relaxed max-w-2xl relative z-10"
            style={{ color: template.accentColor }}
          >
            {greeting.customMessage}
          </motion.p>

          {/* Signature line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 pt-8 border-t-2 opacity-30 w-48 relative z-10"
            style={{ borderColor: template.accentColor }}
          />
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-slate-600 font-light mb-4">
            Create your own beautiful greeting
          </p>
          <Link href="/">
            <button className="px-8 py-3 bg-gradient-to-r from-amber-400 to-yellow-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-light">
              Get Started
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}