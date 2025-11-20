import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LogoBrand } from './LogoBrand';

const navigation = [
  { name: 'ホーム', href: '/' },
  { name: '注文', href: '/order' },
  { 
    name: '商品案内', 
    href: '/products',
    submenu: [
      { name: '商品一覧', href: '/products' },
      { name: '使いやすさ抜群', href: '/products/categories/easy-to-use' },
      { name: '他とは違う対応で', href: '/products/categories/unique-solution' },
      { name: '一般商品', href: '/products/categories/standard' },
      { name: 'お悩み商品解決', href: '/products/categories/solutions' },
    ]
  },
  { name: 'ニュース', href: '/news' },
  { name: '会社情報', href: '/company' },
  { name: 'SDGs', href: '/sdgs' },
  { name: '採用情報', href: '/recruitment' },
  { name: 'お問い合わせ', href: '/contact' },
];

export function ModernHeader({ isLoaded = true }: { isLoaded?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedSubmenu(null);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleSubmenu = (itemName: string) => {
    setExpandedSubmenu(expandedSubmenu === itemName ? null : itemName);
  };

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/98 backdrop-blur-xl border-b border-slate-200/60 shadow-lg shadow-slate-200/50'
            : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex h-20 sm:h-24 items-center justify-between">
            <Link to="/" onClick={scrollToTop} className="relative z-50 block">
              <LogoBrand layoutId="daiko-brand-logo" size="small" />
            </Link>

            {/* Menu button - always visible */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl p-3 text-slate-600 hover:text-blue-900 hover:bg-blue-50/80 transition-all duration-300 z-50 border border-slate-200/80 hover:border-blue-200 shadow-sm hover:shadow-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-40"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-white z-40 shadow-2xl shadow-slate-900/20 overflow-y-auto"
            >
              <div className="pt-28 px-8 sm:px-10 pb-12">
                <nav className="space-y-3">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {item.submenu ? (
                        <div>
                          <button
                            onClick={() => toggleSubmenu(item.name)}
                            className={`w-full flex items-center justify-between py-5 px-6 rounded-2xl text-lg transition-all duration-300 ${
                              isActive(item.href)
                                ? 'bg-gradient-to-r from-blue-50 to-blue-50/50 text-blue-900 border border-blue-200/60 shadow-sm'
                                : 'text-slate-700 hover:bg-slate-50/80 border border-transparent hover:border-slate-200 hover:shadow-sm'
                            }`}
                          >
                            <span>{item.name}</span>
                            {expandedSubmenu === item.name ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                          
                          <AnimatePresence>
                            {expandedSubmenu === item.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="ml-6 mt-2 space-y-1 overflow-hidden"
                              >
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.href}
                                    onClick={scrollToTop}
                                    className={`block py-3.5 px-5 rounded-xl text-base transition-all duration-300 ${
                                      location.pathname === subItem.href
                                        ? 'bg-blue-50/70 text-blue-800 border border-blue-100'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                                    }`}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={item.href}
                          onClick={scrollToTop}
                          className={`block py-5 px-6 rounded-2xl text-lg transition-all duration-300 ${
                            location.pathname === item.href
                              ? 'bg-gradient-to-r from-blue-50 to-blue-50/50 text-blue-900 border border-blue-200/60 shadow-sm'
                              : 'text-slate-700 hover:bg-slate-50/80 border border-transparent hover:border-slate-200 hover:shadow-sm'
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Contact info in menu */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="mt-16 pt-10 border-t border-slate-200/80"
                >
                  <div className="space-y-6 text-sm">
                    <div>
                      <div className="text-slate-500 mb-2 tracking-wide">お電話でのお問い合わせ</div>
                      <a href="tel:052-903-8273" className="text-slate-900 text-xl hover:text-blue-800 transition-colors duration-300 tracking-wide">
                        052-903-8273
                      </a>
                    </div>
                    <div>
                      <div className="text-slate-500 mb-2 tracking-wide">営業時間</div>
                      <div className="text-slate-900 tracking-wide">平日 9:00 - 18:00</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
