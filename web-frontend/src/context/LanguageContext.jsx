import { createContext, useContext, useEffect, useState } from 'react';

const translations = {
  en: { home: 'Home', menu: 'Menu', offers: 'Offers', locations: 'Locations', contact: 'Contact', orderNow: 'Order Now' },
  fr: { home: 'Accueil', menu: 'Menu', offers: 'Offres', locations: 'Adresses', contact: 'Contact', orderNow: 'Commander' },
  ar: { home: 'الرئيسية', menu: 'القائمة', offers: 'العروض', locations: 'المواقع', contact: 'اتصل بنا', orderNow: 'اطلب الآن' },
};

const LanguageContext = createContext(null);
export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('gravity_language') || 'en');
  useEffect(() => { localStorage.setItem('gravity_language', language); document.documentElement.lang = language; document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'; }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage, text: translations[language] }}>{children}</LanguageContext.Provider>;
};
