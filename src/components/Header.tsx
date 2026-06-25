import { FC, useState } from 'react';
import { Logo } from './Logo';
import { Language } from '../types';
import { getTranslation } from '../lib/translations';
import { Globe, Moon, Sun, Menu, X, Heart, MessageSquare, Phone, LogOut } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
  onLogout?: () => void;
  currentTab: string;
  onTabChange: (tab: string) => void;
  favoritesCount: number;
}

export const Header: FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  darkMode,
  onDarkModeToggle,
  onLogout,
  currentTab,
  onTabChange,
  favoritesCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isRtl = lang === 'ar';

  const menuItems = [
    { id: 'home', label: lang === 'ar' ? 'الرئيسية' : getTranslation(lang, 'home') },
    { id: 'services', label: lang === 'ar' ? 'أقسام الخدمات' : 'Services' },
    { id: 'student_housing', label: lang === 'ar' ? 'سكن الطلاب' : getTranslation(lang, 'studentHousing') },
    { id: 'family_rentals', label: lang === 'ar' ? 'شقق للإيجار' : getTranslation(lang, 'rentals') },
    { id: 'property_sales', label: lang === 'ar' ? 'عقارات للبيع' : getTranslation(lang, 'sales') },
    { id: 'maintenance_services', label: lang === 'ar' ? 'الصيانة المنزلية' : getTranslation(lang, 'maintenance') },
    { id: 'about_us', label: lang === 'ar' ? 'من نحن' : getTranslation(lang, 'about') }
  ];

  const handleNavClick = (id: string) => {
    onTabChange(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-[100] w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-gray-100 dark:border-gray-850 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="cursor-pointer" onClick={() => handleNavClick('home')}>
          <Logo className="w-10 h-10 sm:w-11 sm:h-11" light={darkMode} />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3" dir={isRtl ? 'rtl' : 'ltr'}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-2 text-xs xl:text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 ${
                currentTab === item.id
                  ? 'text-[#C9A14A] bg-[#163B63]/5 dark:bg-[#C9A14A]/10 font-bold'
                  : 'text-[#163B63] dark:text-gray-200 hover:text-[#C9A14A] hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Controls Section */}
        <div className="flex items-center gap-2 sm:gap-3" dir={isRtl ? 'rtl' : 'ltr'}>
          {/* Favorites shortcut */}
          <button
            onClick={() => handleNavClick('favorites')}
            className={`p-2 rounded-xl text-xs flex items-center justify-center relative cursor-pointer border hover:scale-105 active:scale-95 transition-all ${
              currentTab === 'favorites'
                ? 'border-[#C9A14A]/40 bg-[#C9A14A]/10 text-[#C9A14A]'
                : 'border-gray-200 dark:border-gray-700 text-[#163B63] dark:text-gray-300 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}
            title={getTranslation(lang, 'viewFavorites')}
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${favoritesCount > 0 ? 'fill-[#C9A14A] text-[#C9A14A]' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C9A14A] text-[#163B63] text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-white dark:border-slate-900 animate-bounce">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Language Switch */}
          <button
            onClick={() => onLanguageChange(lang === 'ar' ? 'en' : 'ar')}
            className="p-2 border border-gray-200 dark:border-gray-700 text-[#163B63] dark:text-gray-300 bg-gray-50 dark:bg-slate-800 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer overflow-hidden flex items-center gap-1 text-[11px] font-semibold transition-all hover:scale-105 active:scale-195"
            title={lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
          >
            <Globe className="w-4 h-4 text-[#C9A14A]" />
            <span className="hidden sm:inline font-mono">{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onDarkModeToggle}
            className="p-2 border border-gray-200 dark:border-gray-700 text-[#163B63] dark:text-gray-300 bg-gray-50 dark:bg-slate-800 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer transition-all hover:scale-105 active:scale-95"
            title={darkMode ? 'Light Theme' : 'Dark Theme'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#C9A14A]" /> : <Moon className="w-4 h-4 text-[#163B63]" />}
          </button>

          {/* Return/Log out to Login Screen Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-2 border border-rose-200 dark:border-rose-950/40 text-rose-600 dark:text-rose-405 bg-rose-50/50 dark:bg-rose-950/20 rounded-xl hover:bg-rose-100 dark:hover:bg-rose-950/40 cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 text-[11px] font-bold"
              title={lang === 'ar' ? 'الرجوع لصفحة تسجيل الدخول' : 'Back to Login Gate'}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{lang === 'ar' ? 'بوابة الدخول' : 'Sign Out'}</span>
            </button>
          )}



          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#163B63] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 top-16 bg-slate-900/60 backdrop-blur-sm z-[98] lg:hidden animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Slider Menu */}
      <div
        className={`fixed top-16 bottom-0 w-72 max-w-[85vw] bg-white dark:bg-slate-950 border-r dark:border-gray-800 shadow-2xl z-[99] transition-transform duration-300 lg:hidden flex flex-col justify-between ${
          isRtl ? 'right-0 border-l dark:border-l-gray-800' : 'left-0 border-r dark:border-r-gray-800'
        } ${
          mobileMenuOpen 
            ? 'translate-x-0' 
            : isRtl ? 'translate-x-full' : '-translate-x-full'
        }`}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="p-5 space-y-2 overflow-y-auto flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-right p-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                currentTab === item.id
                  ? 'bg-[#163B63]/10 dark:bg-[#C9A14A]/10 text-[#C9A14A] border-r-4 border-[#C9A14A]'
                  : 'text-[#163B63] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Lower mobile tray support button & branding indicator */}
        <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-slate-900/50 space-y-3">
          {onLogout && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLogout();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{lang === 'ar' ? 'الرجوع لبوابة الدخول' : 'Back to Login Screen'}</span>
            </button>
          )}


          <p className="text-[10px] text-gray-500 font-mono text-center mt-4">
            Dark Services © 2026 • Bilingual UI
          </p>
        </div>
      </div>
    </header>
  );
};
