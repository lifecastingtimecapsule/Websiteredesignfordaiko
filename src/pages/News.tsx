import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight, Newspaper } from 'lucide-react';
import { newsApi } from '../utils/api';

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
  published: boolean;
}

const categories = ['すべて', 'お知らせ', '新製品情報', 'イベント', 'その他'];

export function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await newsApi.getAll();
      setArticles(response.articles || []);
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredArticles = selectedCategory === 'すべて'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 tracking-wide">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24">
      {/* Header */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 border-b border-slate-200/60 bg-gradient-to-b from-blue-50/50 via-white to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl text-slate-900 mb-8 tracking-tight">
              ニュース
            </h1>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed tracking-wide">
              株式会社大幸の最新情報をお届けします
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-6 sm:px-8 lg:px-12 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-2xl transition-all duration-500 tracking-wide ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-xl shadow-blue-900/25'
                    : 'border-2 border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50/50'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-24"
            >
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center mx-auto mb-6">
                <Newspaper className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl text-slate-900 mb-4 tracking-tight">まだ記事がありません</h3>
              <p className="text-slate-600 tracking-wide">新しい記事が投稿されるまでお待ちください</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Link
                    to={`/news/${article.id}`}
                    className="block group h-full"
                  >
                    <div className="h-full p-6 rounded-3xl border-2 border-slate-200/60 bg-white shadow-lg hover:shadow-xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/60">
                          <Tag className="w-3.5 h-3.5 text-blue-700" />
                          <span className="text-blue-800 text-sm tracking-wide">{article.category}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                          <Calendar className="w-4 h-4" />
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
          )}
        </div>
      </section>
    </div>
  );
}
