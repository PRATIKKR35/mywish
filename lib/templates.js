export const greetingTemplates = {
  birthday: [
    {
      id: 'bd1',
      title: 'Golden Celebration',
      theme: 'luxury-gold',
      gradient: 'from-amber-100 via-yellow-50 to-amber-100',
      accentColor: '#D4AF37',
      icon: '✨',
      message: 'Wishing you a spectacular birthday filled with joy and golden moments',
      animation: 'fadeSlideUp'
    },
    {
      id: 'bd2',
      title: 'Elegant Wishes',
      theme: 'luxury-dark',
      gradient: 'from-slate-900 via-slate-800 to-slate-900',
      accentColor: '#F8F8F8',
      icon: '🎂',
      message: 'May this special day bring you endless happiness and cherished memories',
      animation: 'scaleIn'
    },
    {
      id: 'bd3',
      title: 'Rose Gold Dreams',
      theme: 'luxury-rose',
      gradient: 'from-rose-100 via-pink-50 to-rose-100',
      accentColor: '#B76E79',
      icon: '🌹',
      message: 'Celebrating you today and always. Happy Birthday!',
      animation: 'slideRight'
    }
  ],
  festival: [
    {
      id: 'fs1',
      title: 'Festive Elegance',
      theme: 'luxury-festive',
      gradient: 'from-emerald-100 via-teal-50 to-emerald-100',
      accentColor: '#047857',
      icon: '🎄',
      message: 'Season\'s greetings and warmest wishes for a joyous celebration',
      animation: 'fadeSlideUp'
    },
    {
      id: 'fs2',
      title: 'Midnight Celebration',
      theme: 'luxury-midnight',
      gradient: 'from-indigo-900 via-purple-900 to-indigo-900',
      accentColor: '#FFD700',
      icon: '🎆',
      message: 'Wishing you light, laughter, and prosperity this festive season',
      animation: 'scaleIn'
    },
    {
      id: 'fs3',
      title: 'Crystal Joy',
      theme: 'luxury-ice',
      gradient: 'from-blue-50 via-cyan-50 to-blue-50',
      accentColor: '#0891B2',
      icon: '❄️',
      message: 'May this season sparkle with moments of love and laughter',
      animation: 'slideRight'
    }
  ],
  love: [
    {
      id: 'lv1',
      title: 'Timeless Romance',
      theme: 'luxury-romance',
      gradient: 'from-red-50 via-pink-50 to-red-50',
      accentColor: '#BE123C',
      icon: '💝',
      message: 'My heart is yours, today and always',
      animation: 'fadeSlideUp'
    },
    {
      id: 'lv2',
      title: 'Eternal Bond',
      theme: 'luxury-deep',
      gradient: 'from-purple-900 via-fuchsia-900 to-purple-900',
      accentColor: '#F8F8F8',
      icon: '💎',
      message: 'Our love story is my favorite adventure',
      animation: 'scaleIn'
    },
    {
      id: 'lv3',
      title: 'Champagne Love',
      theme: 'luxury-champagne',
      gradient: 'from-amber-50 via-yellow-50 to-amber-50',
      accentColor: '#92400E',
      icon: '🥂',
      message: 'To us, to love, to forever',
      animation: 'slideRight'
    }
  ],
  wedding: [
    {
      id: 'wd1',
      title: 'Classic Elegance',
      theme: 'luxury-classic',
      gradient: 'from-stone-100 via-neutral-50 to-stone-100',
      accentColor: '#57534E',
      icon: '💍',
      message: 'Congratulations on your wedding day! Wishing you a lifetime of love and happiness',
      animation: 'fadeSlideUp'
    },
    {
      id: 'wd2',
      title: 'Royal Celebration',
      theme: 'luxury-royal',
      gradient: 'from-violet-100 via-purple-50 to-violet-100',
      accentColor: '#6B21A8',
      icon: '👑',
      message: 'May your union be blessed with endless joy and prosperity',
      animation: 'scaleIn'
    },
    {
      id: 'wd3',
      title: 'Garden Romance',
      theme: 'luxury-garden',
      gradient: 'from-green-50 via-emerald-50 to-green-50',
      accentColor: '#065F46',
      icon: '🌿',
      message: 'Here\'s to love, laughter, and happily ever after',
      animation: 'slideRight'
    }
  ]
};

export const getTemplatesByCategory = (category) => {
  return greetingTemplates[category] || [];
};

export const getTemplateById = (id) => {
  for (const category in greetingTemplates) {
    const template = greetingTemplates[category].find(t => t.id === id);
    if (template) return template;
  }
  return null;
};