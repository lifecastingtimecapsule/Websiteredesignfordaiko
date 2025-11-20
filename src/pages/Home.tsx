import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Printer, Factory, Users, Phone, Mail, MapPin, Calendar, Tag, Newspaper, Award } from 'lucide-react';
import { newsApi } from '../utils/api';
import { products } from '../data/productsData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

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
      setNews(articles.slice(0, 5));
    } catch (error) {
      console.error('Failed to load news:', error);
    } finally {
      setIsLoadingNews(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Hero Section: スカイブルーを大胆に使いつつ、緑をグラデーションで混ぜる */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        
        {/* 背景：白ベースだが、右上にスカイブルー、左下に緑の光を配置 */}
        <div className="absolute inset-0 bg-white">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-sky-100/50 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* 左側：テキストエリア */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-sm font-medium mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                Since 1982 / 株式会社 大幸
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
                信頼を、<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-600">
                  未来へ刷り込む。
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
                1ミリの狂いも許さない職人技術と、最新デジタル技術の融合。<br />
                名古屋から全国へ。私たちは印刷を通じて、<br />
                お客様のビジネスという「森」を育てます。
              </p>

              <div className="flex flex-wrap gap-4">
                {/* メインアクション：スカイブルー */}
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-sky-600 text-white rounded-full font-medium transition-all hover:bg-sky-700 hover:shadow-lg hover:shadow-sky-200 hover:-translate-y-0.5"
                >
                  製品一覧を見る
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                
                {/* サブアクション：白ベース＋緑ボーダー（大森様の緑を控えめに） */}
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-700 border border-emerald-200 rounded-full font-medium transition-all hover:bg-emerald-50 hover:border-emerald-300"
                >
                  お問い合わせ
                </Link>
              </div>
            </motion.div>

            {/* 右側：ビジュアルエリア */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              {/* 画像の角丸を大きくし、枠線を消すことでモダンに */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 to-transparent z-10 mix-blend-overlay" />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1562564013-0971ad28b7a4?auto=format&fit=crop&q=80&w=1000"
                  alt="Printing Technology"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* 実績カード：緑のアクセント */}
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">創業実績</p>
                    <p className="text-2xl font-bold text-slate-900">40 Years+</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section: 枠線を消し、余白で魅せる */}
      <section className="py-32 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4"
            >
              Our Service
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 h-1 bg-gradient-to-r from-sky-500 to-emerald-500 mx-auto rounded-full"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                {/* アイコン背景にスカイブルー〜緑のグラデーションを薄く敷く */}
                <div className="w-16 h-16 mb-8 rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50 flex items-center justify-center text-sky-700">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid: 2色のグラデーションで統一感 */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4"
            >
              Why Choose Us
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 h-1 bg-gradient-to-r from-sky-500 to-emerald-500 mx-auto rounded-full"
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
                className="bg-gradient-to-br from-sky-50/50 to-emerald-50/30 p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-32 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4"
            >
              Products
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 h-1 bg-gradient-to-r from-sky-500 to-emerald-500 mx-auto rounded-full"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
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
                  <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="aspect-[4/3] bg-slate-50 overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="inline-block px-3 py-1 bg-gradient-to-r from-sky-100 to-emerald-100 text-sky-700 text-xs font-medium rounded-full mb-3">
                        {product.categoryName}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
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
            className="text-center"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-sky-600 to-emerald-600 text-white rounded-full font-medium hover:from-sky-700 hover:to-emerald-700 transition-all hover:shadow-lg hover:shadow-sky-200 hover:-translate-y-0.5"
            >
              <span>すべての製品を見る</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section: スカイブルーと緑の対比 */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl lg:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-600">
                  {stat.value}
                </div>
                <div className="text-lg text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-32 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4"
            >
              Latest News
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 h-1 bg-gradient-to-r from-sky-500 to-emerald-500 mx-auto rounded-full"
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
              <div className="w-20 h-20 bg-gradient-to-br from-sky-50 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Newspaper className="w-10 h-10 text-sky-600" />
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
                      <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-sky-100 to-emerald-100 rounded-full">
                            <Tag className="w-3 h-3 text-sky-700" />
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
                  className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-sky-600 to-emerald-600 text-white rounded-full font-medium hover:from-sky-700 hover:to-emerald-700 transition-all hover:shadow-lg hover:shadow-sky-200 hover:-translate-y-0.5"
                >
                  <span>すべてのニュースを見る</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4"
            >
              Contact
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 h-1 bg-gradient-to-r from-sky-500 to-emerald-500 mx-auto rounded-full"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-sky-50/50 to-emerald-50/30 p-10 rounded-3xl text-center"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Phone className="w-7 h-7 text-sky-600" />
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
              className="bg-gradient-to-br from-sky-50/50 to-emerald-50/30 p-10 rounded-3xl text-center"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Mail className="w-7 h-7 text-sky-600" />
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
              className="bg-gradient-to-br from-sky-50/50 to-emerald-50/30 p-10 rounded-3xl text-center"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <MapPin className="w-7 h-7 text-sky-600" />
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
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-sky-600 to-emerald-600 text-white rounded-full font-medium hover:from-sky-700 hover:to-emerald-700 transition-all hover:shadow-lg hover:shadow-sky-200 hover:-translate-y-0.5"
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
