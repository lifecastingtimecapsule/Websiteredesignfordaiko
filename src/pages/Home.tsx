import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Printer, Factory, Users, Phone, Mail, MapPin, Calendar, Tag, Newspaper, Award } from 'lucide-react';
import { newsApi } from '../utils/api';
import { products } from '../data/productsData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import heroPrintingImg from '../assets/hero-printing.jpg';

const services = [
  {
    icon: Printer,
    title: 'シール・ラベル印刷',
    description: '小ロットから大量生産まで対応可能。お客様のニーズに合わせた柔軟な生産体制を整えています。',
  },
  {
    icon: Factory,
    title: '多様な加工技術',
    description: 'ラミネート、箔押し、型抜き等、最新設備による高度な加工技術で、付加価値の高い製品をご提供します。',
  },
  {
    icon: Users,
    title: 'トータルサポート',
    description: 'デザインから納品まで、専門スタッフが一貫してサポート。お客様の課題解決をお手伝いします。',
  },
];

const features = [
  { title: '短納期対応', description: 'お急ぎのご注文にも柔軟に対応' },
  { title: '小ロット対応', description: '少量から高品質印刷を実現' },
  { title: 'オーダーメイド', description: '完全カスタマイズ対応可能' },
  { title: '環境配慮', description: 'SDGs持続可能な印刷を推進' },
  { title: '最新設備', description: '高性能な印刷機を完備' },
  { title: '品質保証', description: '厳格な検品体制を構築' },
];

const stats = [
  { value: '40+', label: '年の実績', sub: 'Years of Excellence' },
  { value: '1000+', label: '企業様との取引', sub: 'Corporate Partners' },
  { value: '100+', label: '種類の製品', sub: 'Product Variations' },
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
      setNews(articles.slice(0, 5));
    } catch (error) {
      console.error('Failed to load news:', error);
    } finally {
      setIsLoadingNews(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-hidden">
      
      {/* --- Hero Section: スカイブルー全開で「空」を表現 --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 px-6">
        {/* 背景：青い光のみでシンプルに */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-sky-100/60 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-slate-900">
                一枚に、<br />
                <span className="text-sky-500">創業からの<br />誇りを込めて</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 mb-10 leading-relaxed max-w-xl tracking-wider">
                1ミリの狂いも許さない職人技術と、最新デジタル技術の融合。<br />
                名古屋から全国へ。お客様のビジネスを加速させます。
              </p>

              <div className="flex flex-wrap gap-4">
                {/* メインボタン：鮮やかなスカイブルー */}
                <Link
                  to="/products"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-sky-500 text-white rounded-full font-bold transition-all hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-200 hover:-translate-y-1"
                >
                  製品一覧を見る <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                
                {/* サブボタン：シンプルに */}
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-medium transition-all hover:bg-slate-50"
                >
                  お問い合わせ
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-[3rem] overflow-hidden" style={{boxShadow: '0 20px 80px -10px rgba(56, 189, 248, 0.25)'}}>
                <ImageWithFallback
                  src={heroPrintingImg}
                  alt="Printing Technology"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Stats Section: ここで「会社の実績」として緑を投入 --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* 緑の光を背景に入れて「大森（森）」を演出 */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-emerald-900/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-5xl lg:text-6xl font-bold mb-2 text-emerald-400">
                  {stat.value}
                </div>
                <div className="text-white text-base uppercase tracking-wide">{stat.label}</div>
                <div className="text-slate-500 text-[10px] mt-1.5 tracking-widest uppercase">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Services Section: 青と白でクリーンに --- */}
      <section className="py-32 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4"
            >
              Our Service
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-12 h-1 bg-sky-500 mx-auto rounded-full"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="w-20 h-20 mb-6 rounded-full bg-white mx-auto flex items-center justify-center text-sky-500 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4"
            >
              Why Choose Us
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-12 h-1 bg-sky-500 mx-auto rounded-full"
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Products Section --- */}
      <section className="py-32 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Products</h2>
              <p className="text-slate-600">多様なニズに応える製品ラインナップ</p>
            </div>
            <Link to="/products" className="text-sky-600 font-bold flex items-center gap-2 hover:text-sky-700 transition-colors">
              VIEW ALL <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products
              .filter(p => ['privacy-seal', 'anti-photography-seal', 'product-seal'].includes(p.id))
              .map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/products/${product.id}`} className="block group">
                  <div className="bg-white rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-sky-100/50">
                    <div className="aspect-[4/3] p-8 flex items-center justify-center bg-slate-50">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="px-8 pb-8">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Company / SDGs Link: 緑を使って「会社」へ誘導 --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/company" className="relative group overflow-hidden rounded-[2rem] bg-emerald-900 h-80 flex items-center p-10">
              <div className="absolute inset-0 opacity-40 group-hover:opacity-30 transition-opacity">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  alt="Company"
                />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-4">Company</h3>
                <p className="text-emerald-100 mb-6">創業40年以上の歴史と信頼。<br/>株式会社大幸について。</p>
                <span className="inline-flex items-center text-white font-bold border-b border-emerald-500 pb-1">
                  会社情報を見る <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link to="/sdgs" className="relative group overflow-hidden rounded-[2rem] bg-sky-900 h-80 flex items-center p-10">
              <div className="absolute inset-0 opacity-40 group-hover:opacity-30 transition-opacity">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  alt="SDGs"
                />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-4">SDGs</h3>
                <p className="text-sky-100 mb-6">環境と調和する、<br/>持続可能なモノづくり。</p>
                <span className="inline-flex items-center text-white font-bold border-b border-sky-500 pb-1">
                  取り組みを見る <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* --- News Section --- */}
      <section className="py-32 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4"
            >
              Latest News
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-12 h-1 bg-sky-500 mx-auto rounded-full"
            />
          </div>

          {isLoadingNews ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-2 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-600">読み込み中...</p>
            </div>
          ) : news.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <Newspaper className="w-10 h-10 text-sky-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">まだ記事がありません</h3>
              <p className="text-slate-600">新しい記事が投稿されるまでお待ちください</p>
            </motion.div>
          ) : (
            <>
              <div className={`grid ${news.length >= 2 ? 'md:grid-cols-2' : ''} ${news.length >= 3 ? 'lg:grid-cols-3' : ''} gap-8 mb-16`}>
                {news.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={`/news/${article.id}`} className="block group">
                      <div className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 rounded-full">
                            <Tag className="w-3 h-3 text-sky-600" />
                            <span className="text-sky-700 text-xs font-medium">{article.category}</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(article.date).toLocaleDateString('ja-JP', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-sky-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
                          {article.content}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <span className="text-slate-500 text-sm">{article.author}</span>
                          <div className="flex items-center gap-2 text-sky-600">
                            <span className="text-sm font-medium">続きを読む</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                className="text-center"
              >
                <Link
                  to="/news"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-sky-500 text-white rounded-full font-medium hover:bg-sky-600 transition-all hover:shadow-lg hover:shadow-sky-200 hover:-translate-y-0.5"
                >
                  <span>すべてのニュースを見る</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4"
            >
              Contact
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-12 h-1 bg-sky-500 mx-auto rounded-full"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-10 rounded-[2rem] text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Phone className="w-7 h-7 text-sky-500" />
              </div>
              <h3 className="text-sm text-slate-700 font-medium mb-3 tracking-wider uppercase">お電話</h3>
              <a href="tel:052-903-8273" className="text-2xl font-bold text-slate-900 hover:text-sky-600 transition-colors block mb-2">
                052-903-8273
              </a>
              <p className="text-slate-600 text-sm">平日 9:00 - 18:00</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-50 p-10 rounded-[2rem] text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Mail className="w-7 h-7 text-sky-500" />
              </div>
              <h3 className="text-sm text-slate-700 font-medium mb-3 tracking-wider uppercase">メール</h3>
              <a href="mailto:daikoinfo@daiko-lsf.jp" className="text-lg font-bold text-slate-900 hover:text-sky-600 transition-colors break-all">
                daikoinfo@daiko-lsf.jp
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-50 p-10 rounded-[2rem] text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <MapPin className="w-7 h-7 text-sky-500" />
              </div>
              <h3 className="text-sm text-slate-700 font-medium mb-3 tracking-wider uppercase">所在地</h3>
              <p className="text-slate-900 font-medium leading-relaxed">
                〒462-0034<br />
                名古屋市北区天道町4丁目11
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-sky-500 text-white rounded-full font-medium hover:bg-sky-600 transition-all hover:shadow-lg hover:shadow-sky-200 hover:-translate-y-0.5"
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