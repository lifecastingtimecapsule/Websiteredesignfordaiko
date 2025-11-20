import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Tag, ArrowLeft, User } from 'lucide-react';
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

export function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadArticle(id);
    }
  }, [id]);

  const loadArticle = async (articleId: string) => {
    try {
      const response = await newsApi.getById(articleId);
      setArticle(response.article);
    } catch (error) {
      console.error('Failed to load article:', error);
      navigate('/news');
    } finally {
      setIsLoading(false);
    }
  };

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

  if (!article) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24">
      {/* Header */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 border-b border-slate-200/60 bg-gradient-to-b from-blue-50/50 via-white to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/news"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-slate-200 text-slate-700 hover:border-blue-200 hover:text-blue-800 hover:bg-blue-50/50 transition-all duration-500 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="tracking-wide">ニュース一覧に戻る</span>
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200/60">
                <Tag className="w-4 h-4 text-blue-700" />
                <span className="text-blue-800 tracking-wide">{article.category}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar className="w-4 h-4" />
                <span className="tracking-wide">
                  {new Date(article.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <User className="w-4 h-4" />
                <span className="tracking-wide">{article.author}</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-8 tracking-tight leading-tight">
              {article.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="prose prose-slate prose-lg max-w-none"
          >
            <div className="p-8 sm:p-10 rounded-3xl border-2 border-slate-200/60 bg-white shadow-lg">
              <div className="text-slate-700 leading-relaxed tracking-wide whitespace-pre-wrap">
                {article.content}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 pt-8 border-t-2 border-slate-200/60"
          >
            <Link
              to="/news"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl hover:from-blue-800 hover:to-blue-600 transition-all duration-500 shadow-xl shadow-blue-900/25 hover:shadow-2xl hover:shadow-blue-900/40 tracking-wide"
            >
              <ArrowLeft className="w-5 h-5" />
              ニュース一覧に戻る
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
