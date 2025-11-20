import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, LogOut, Newspaper, Calendar, Eye, Image as ImageIcon, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { getSupabaseClient } from '../../utils/supabase/client';
import { newsApi } from '../../utils/api';

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
  published: boolean;
  imageUrl?: string | null;
}

export function StaffDashboard() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'お知らせ',
    imageUrl: null as string | null,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const supabase = getSupabaseClient();
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        navigate('/staff/login');
        return;
      }

      if (session.user.user_metadata?.role !== 'staff') {
        await supabase.auth.signOut();
        toast.error('スタッフアカウントでログインしてください');
        navigate('/staff/login');
        return;
      }

      setAccessToken(session.access_token);
      await loadArticles(session.access_token);
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/staff/login');
    } finally {
      setIsLoading(false);
    }
  };

  const loadArticles = async (token: string) => {
    try {
      const response = await newsApi.staff.getAll(token);
      setArticles(response.articles || []);
    } catch (error) {
      console.error('Failed to load articles:', error);
      toast.error('記事の読み込みに失敗しました');
    }
  };

  const handleLogout = async () => {
    try {
      const supabase = getSupabaseClient();
      await supabase.auth.signOut();
      toast.success('ログアウトしました');
      navigate('/staff/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('ログアウトに失敗しました');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let imageUrl = formData.imageUrl;

      // 画像がアップロードされている場合、先にアップロード
      if (imageFile) {
        setIsUploading(true);
        const uploadFormData = new FormData();
        uploadFormData.append('file', imageFile);

        const uploadResponse = await fetch(
          `https://${(await import('../../utils/supabase/info')).projectId}.supabase.co/functions/v1/make-server-249c283c/staff/upload-image`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
            body: uploadFormData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error('画像のアップロードに失敗しました');
        }

        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.url;
        setIsUploading(false);
      }

      const articleData = {
        ...formData,
        imageUrl,
      };

      if (currentArticle) {
        // Update existing article
        await newsApi.staff.update(accessToken, currentArticle.id, articleData);
        toast.success('記事を更新しました');
      } else {
        // Create new article
        await newsApi.staff.create(accessToken, articleData);
        toast.success('記事を投稿しました');
      }

      // Reload articles
      await loadArticles(accessToken);
      
      // Reset form
      setFormData({ title: '', content: '', category: 'お知らせ', imageUrl: null });
      setImageFile(null);
      setImagePreview(null);
      setCurrentArticle(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save article:', error);
      toast.error('記事の保存に失敗しました');
      setIsUploading(false);
    }
  };

  const handleEdit = (article: NewsArticle) => {
    setCurrentArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category,
      imageUrl: article.imageUrl || null,
    });
    if (article.imageUrl) {
      setImagePreview(article.imageUrl);
    }
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('この記事を削除してもよろしいですか？')) {
      return;
    }

    try {
      await newsApi.staff.delete(accessToken, id);
      toast.success('記事を削除しました');
      await loadArticles(accessToken);
    } catch (error) {
      console.error('Failed to delete article:', error);
      toast.error('記事の削除に失敗しました');
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', content: '', category: 'お知らせ', imageUrl: null });
    setImageFile(null);
    setImagePreview(null);
    setCurrentArticle(null);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 tracking-wide">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20 sm:pt-24 pb-24">
      {/* Header */}
      <section className="py-12 px-6 sm:px-8 lg:px-12 bg-gradient-to-r from-blue-900 to-blue-700 text-white mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl mb-3 tracking-tight">スタッフダッシュボード</h1>
              <p className="text-blue-100 tracking-wide">ニュース・記事管理</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-all duration-300 backdrop-blur-sm border border-white/30"
            >
              <LogOut className="w-5 h-5" />
              <span className="tracking-wide">ログアウト</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Article Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-slate-200/60"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-blue-700" />
              </div>
              <h2 className="text-2xl text-slate-900 tracking-tight">
                {isEditing ? '記事を編集' : '新規記事作成'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-slate-700 mb-3 tracking-wide">
                  タイトル <span className="text-blue-700">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                  placeholder="記事のタイトル"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-3 tracking-wide">
                  カテゴリー <span className="text-blue-700">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                  required
                >
                  <option value="お知らせ">お知らせ</option>
                  <option value="新製品情報">新製品情報</option>
                  <option value="イベント">イベント</option>
                  <option value="その他">その他</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-3 tracking-wide">
                  本文 <span className="text-blue-700">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all resize-none shadow-sm"
                  placeholder="記事の本文を入力してください"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-3 tracking-wide">
                  画像 <span className="text-slate-500 text-sm">(任意)</span>
                </label>
                <div className="space-y-3">
                  {imagePreview ? (
                    <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200">
                      <img 
                        src={imagePreview} 
                        alt="プレビュー" 
                        className="w-full h-48 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                          setFormData({ ...formData, imageUrl: null });
                        }}
                        className="absolute top-3 right-3 w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-blue-600 hover:bg-blue-50/30 transition-all">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-10 h-10 text-slate-400 mb-2" />
                        <p className="text-sm text-slate-600 tracking-wide">
                          クリックして画像を選択
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          PNG, JPG, GIF, WEBP (最大5MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl hover:from-blue-800 hover:to-blue-600 transition-all duration-500 shadow-xl shadow-blue-900/25 hover:shadow-2xl hover:shadow-blue-900/40 tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      アップロード中...
                    </>
                  ) : isEditing ? (
                    <>
                      <Edit className="w-5 h-5" />
                      更新する
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      投稿する
                    </>
                  )}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-2xl hover:border-blue-800 hover:text-blue-900 hover:bg-blue-50/50 transition-all duration-500 tracking-wide"
                  >
                    キャンセル
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Articles List */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-slate-900 tracking-tight">投稿済み記事</h2>
              <a
                href="/news"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 text-blue-800 hover:text-blue-900 hover:bg-blue-50 rounded-2xl transition-all duration-300 border-2 border-blue-200/60"
              >
                <Eye className="w-4 h-4" />
                <span className="tracking-wide text-sm">プレビュー</span>
              </a>
            </div>

            <div className="space-y-4">
              {articles.length === 0 ? (
                <div className="p-8 rounded-2xl bg-slate-50 border-2 border-slate-200/60 text-center">
                  <Newspaper className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 tracking-wide">まだ記事がありません</p>
                </div>
              ) : (
                articles.map((article) => (
                  <div
                    key={article.id}
                    className="p-6 rounded-2xl bg-white border-2 border-slate-200/60 shadow-lg hover:shadow-xl hover:border-blue-200 transition-all duration-500"
                  >
                    {article.imageUrl && (
                      <div className="mb-4 rounded-xl overflow-hidden">
                        <img 
                          src={article.imageUrl} 
                          alt={article.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-800 text-sm tracking-wide">
                            {article.category}
                          </span>
                          <span className="flex items-center gap-1 text-slate-500 text-sm">
                            <Calendar className="w-4 h-4" />
                            {new Date(article.date).toLocaleDateString('ja-JP')}
                          </span>
                        </div>
                        <h3 className="text-lg text-slate-900 mb-2 tracking-tight">
                          {article.title}
                        </h3>
                        <p className="text-slate-600 text-sm line-clamp-2 tracking-wide">
                          {article.content}
                        </p>
                        <p className="text-slate-500 text-sm mt-2">
                          投稿者: {article.author}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(article)}
                          className="p-2 text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-300"
                          title="編集"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                          title="削除"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
