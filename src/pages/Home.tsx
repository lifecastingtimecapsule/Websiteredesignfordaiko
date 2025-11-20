import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Printer, Award, Zap, Sparkles, Factory, Users, CheckCircle2, Phone, Mail, MapPin, Calendar, Tag, Newspaper } from 'lucide-react';
import { newsApi } from '../utils/api';
import { products } from '../data/productsData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const highlights = [
  { icon: Printer, text: 'シール・ラベル印刷専門' },
  { icon: Award, text: '1982年創業の実績' },
  { icon: Zap, text: '最新設備導入' },
];

const services = [
  {
    icon: Printer,
    title: 'シール・ラベル印刷',
    description: '小ロットから大量生産まで対応',
  },
  {
    icon: Factory,
    title: '多様な加工技術',
    description: 'ラミネート、箔押し、型抜き等',
  },
  {
    icon: Users,
    title: 'トータルサポート',
    description: 'デザインから納品まで対応',
  },
];

const features = [
  {
    title: '短納期対応',
    description: 'お急ぎのご注文にも対応',
  },
  {
    title: '小ロット対応',
    description: '少量から高品質印刷',
  },
  {
    title: 'オーダーメイド',
    description: 'カスタマイズ対応',
  },
  {
    title: '環境配慮',
    description: 'SDGs持続可能な印刷',
  },
  {
    title: '最新設備',
    description: '高性能な印刷機完備',
  },
  {
    title: '品質保証',
    description: '厳格な検品体制',
  },
];



const stats = [
  { value: '40+', label: '年の実績' },
  { value: '1000+', label: '企業様との取引' },
  { value: '100+', label: '種類の製品' },
];

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
  published: boolean;
}

export function Home() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const response = await newsApi.getAll();
      const articles = response.articles || [];
      // 最新5件のみ表示
      setNews(articles.slice(0, 5));
    } catch (error) {
      console.error('Failed to load news:', error);
    } finally {
      setIsLoadingNews(false);
    }
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30" />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #0891b2 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }} />
        </div>

        <div className="relative z-10 w-full h-full min-h-screen flex items-center">
          {/* Left Content Area with Strong Diagonal Cut */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full lg:w-[60%] min-h-screen flex items-center bg-gradient-to-br from-white via-cyan-50/30 to-emerald-50/40"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0 100%)',
            }}
          >
            <div className="w-full px-6 sm:px-12 lg:px-20 xl:px-32 py-20">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-8 sm:mb-12 tracking-tight">
                <span className="block text-slate-900 whitespace-nowrap">株式会社大幸</span>
              </h1>

              {/* Catchphrases */}
              <div className="space-y-4 sm:space-y-6 max-w-4xl">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-slate-800 tracking-tight whitespace-nowrap"
                >
                  信頼を印刷する。
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed whitespace-nowrap"
                >
                  名古屋から全国へ。最先端技術と職人の技で、あなたのビジネスを支えます。
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Right Image Area */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 w-full lg:w-[55%] h-full hidden lg:block"
            style={{
              clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)',
            }}
          >
            <div className="relative w-full h-full">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-emerald-600/20 z-10" />
              
              {/* Premium Floating Orbs */}
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl z-10" />
              <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl z-10" />
              
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1744126175546-d7c5366e94f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludGluZyUyMHByZXNzJTIwbWFjaGluZSUyMGZhY3Rvcnl8ZW58MXx8fHwxNzYzNjI5MjYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="大幸の印刷技術"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Mobile Layout */}
          <div className="lg:hidden absolute inset-0 flex flex-col">
            <div className="flex-1 flex items-center px-6 py-12 bg-gradient-to-br from-white via-cyan-50/30 to-emerald-50/40 relative z-20">
              <div className="w-full">
                <h1 className="text-4xl sm:text-5xl mb-6 tracking-tight">
                  <span className="block text-slate-900 mb-2">株式会社</span>
                  <span className="block bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent">大幸</span>
                </h1>

                <div className="space-y-4">
                  <p className="text-2xl sm:text-3xl text-slate-800 tracking-tight">
                    信頼を印刷する。
                  </p>
                  <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
                    名古屋から全国へ。<br />
                    最先端技術と職人の技で、<br />
                    あなたのビジネスを支えます。
                  </p>
                </div>
              </div>
            </div>

            <div className="h-64 sm:h-80 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/15 to-emerald-600/15 z-10" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1744126175546-d7c5366e94f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludGluZyUyMHByZXNzJTIwbWFjaGluZSUyMGZhY3Rvcnl8ZW58MXx8fHwxNzYzNjI5MjYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="大幸の印刷技術"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-8 sm:py-32 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-6 sm:mb-16"
          >

            <h2 className="text-3xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight tracking-tight">
              サービス
            </h2>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="p-4 sm:p-8 rounded-3xl border-2 border-slate-200/60 bg-white shadow-lg hover:shadow-xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center mb-3 sm:mb-6">
                  <service.icon className="w-6 sm:w-8 h-6 sm:h-8 text-blue-700" />
                </div>
                <h3 className="text-lg sm:text-2xl text-slate-900 mb-2 sm:mb-4 tracking-tight">{service.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed tracking-wide">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-8 sm:py-32 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-6 sm:mb-16"
          >
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight tracking-tight">
              選ばれる理由
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="p-3 sm:p-6 rounded-2xl border-2 border-slate-200/60 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-blue-200 transition-all duration-500"
              >
                <div className="flex items-start gap-2 sm:gap-4">
                  <CheckCircle2 className="w-5 sm:w-6 h-5 sm:h-6 text-blue-700 flex-shrink-0 mt-0.5 sm:mt-1" />
                  <div>
                    <h3 className="text-sm sm:text-lg text-slate-900 mb-1 sm:mb-2 tracking-tight">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed tracking-wide">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-8 sm:py-32 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-6 sm:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight tracking-tight">
              品一覧
            </h2>
          </motion.div>

          <div className="grid grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-8 mb-6 sm:mb-12">
            {products
              .filter(p => ['privacy-seal', 'anti-photography-seal', 'product-seal'].includes(p.id))
              .map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Link
                  to={`/products/${product.id}`}
                  className="block group h-full"
                >
                  <div className="h-full rounded-3xl border-2 border-slate-200/60 overflow-hidden shadow-lg hover:shadow-xl hover:border-blue-200 transition-all duration-500 bg-white hover:-translate-y-1">
                    <div className="aspect-[4/3] overflow-hidden bg-slate-50">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 p-3 sm:p-6"
                      />
                    </div>
                    <div className="p-3 sm:p-6">
                      <div className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-blue-50 border border-blue-200/60 mb-2 sm:mb-3">
                        <span className="text-blue-800 text-xs sm:text-sm tracking-wide">{product.categoryName}</span>
                      </div>
                      <h3 className="text-base sm:text-2xl text-slate-900 group-hover:text-blue-800 transition-colors duration-300 tracking-tight mb-2 sm:mb-3">
                        {product.title}
                      </h3>
                      <p className="text-xs sm:text-base text-slate-600 leading-relaxed tracking-wide line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-2xl hover:from-cyan-500 hover:to-teal-500 transition-all duration-500 shadow-xl shadow-cyan-600/30 hover:shadow-2xl hover:shadow-cyan-600/50 tracking-wide"
            >
              <span>すべての製品を見る</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-32 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-3 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="text-center p-4 sm:p-10 rounded-3xl border-2 border-slate-200/60 bg-white shadow-lg hover:shadow-xl hover:border-blue-200 transition-all duration-500"
              >
                <div className="text-3xl sm:text-6xl bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 bg-clip-text text-transparent mb-2 sm:mb-4 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-lg text-slate-600 tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-8 sm:py-32 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-6 sm:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight tracking-tight">
              最新ニュース
            </h2>
          </motion.div>

          {isLoadingNews ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-600 tracking-wide">読み込み中...</p>
            </div>
          ) : news.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center mx-auto mb-6">
                <Newspaper className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl text-slate-900 mb-4 tracking-tight">まだ記事がありません</h3>
              <p className="text-slate-600 tracking-wide">新しい記事が投稿されるまでお待ちください</p>
            </motion.div>
          ) : (
            <>
              <div className={`grid ${news.length % 2 === 0 ? 'grid-cols-2' : 'grid-cols-3'} lg:grid-cols-3 gap-3 sm:gap-8 mb-6 sm:mb-12`}>
                {news.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/news/${article.id}`}
                      className="block group h-full"
                    >
                      <div className="h-full p-3 sm:p-6 rounded-3xl border-2 border-slate-200/60 bg-white shadow-lg hover:shadow-xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-1">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-blue-50 border border-blue-200/60">
                            <Tag className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-blue-700" />
                            <span className="text-blue-800 text-xs sm:text-sm tracking-wide">{article.category}</span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-1.5 text-slate-500 text-xs sm:text-sm">
                            <Calendar className="w-3 sm:w-4 h-3 sm:h-4" />
                            <span className="tracking-wide">
                              {new Date(article.date).toLocaleDateString('ja-JP', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-xl text-slate-900 mb-3 group-hover:text-blue-800 transition-colors duration-300 tracking-tight line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed tracking-wide">
                          {article.content}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                          <span className="text-slate-500 text-sm tracking-wide">
                            {article.author}
                          </span>
                          <div className="flex items-center gap-2 text-blue-700 group-hover:gap-3 transition-all duration-300">
                            <span className="text-sm tracking-wide">続きを読む</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <Link
                  to="/news"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-2xl hover:from-cyan-500 hover:to-teal-500 transition-all duration-500 shadow-xl shadow-cyan-600/30 hover:shadow-2xl hover:shadow-cyan-600/50 tracking-wide"
                >
                  <span>すべてのニュースを見る</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-8 sm:py-32 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-6 sm:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight tracking-tight">
              お問い合わせ
            </h2>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-3 gap-3 sm:gap-8 mb-6 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-3 sm:p-5 rounded-3xl border-2 border-slate-200/60 bg-white shadow-lg hover:shadow-xl transition-all duration-500 text-center"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" />
              </div>
              <h3 className="text-xs sm:text-sm text-slate-900 mb-1 sm:mb-2">お電話</h3>
              <a href="tel:052-903-8273" className="text-sm sm:text-lg text-blue-800 hover:text-blue-900 transition-colors">
                052-903-8273
              </a>
              <p className="text-slate-600 text-xs mt-1 sm:mt-2">平日 9:00 - 18:00</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="p-3 sm:p-5 rounded-3xl border-2 border-slate-200/60 bg-white shadow-lg hover:shadow-xl transition-all duration-500 text-center"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" />
              </div>
              <h3 className="text-xs sm:text-sm text-slate-900 mb-1 sm:mb-2">メール</h3>
              <a href="mailto:daikoinfo@daiko-lsf.jp" className="text-xs sm:text-sm text-blue-800 hover:text-blue-900 transition-colors break-all">
                daikoinfo@daiko-lsf.jp
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-3 sm:p-5 rounded-3xl border-2 border-slate-200/60 bg-white shadow-lg hover:shadow-xl transition-all duration-500 text-center"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" />
              </div>
              <h3 className="text-xs sm:text-sm text-slate-900 mb-1 sm:mb-2">所在地</h3>
              <p className="text-slate-700 text-xs sm:text-sm">
                〒462-0034<br />
                名古屋市北区天道町4丁目11
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-2xl hover:from-cyan-500 hover:to-teal-500 transition-all duration-500 shadow-xl shadow-cyan-600/30 hover:shadow-2xl hover:shadow-cyan-600/50 tracking-wide"
            >
              <span>お問い合わせフォーム</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}