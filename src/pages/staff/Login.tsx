import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { getSupabaseClient } from '../../utils/supabase/client';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export function StaffLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Try to initialize default staff account on component mount
  useEffect(() => {
    const initDefaultStaff = async () => {
      try {
        await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-249c283c/staff/init-default`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } catch (error) {
        // Silently fail - user can still login if account exists
        console.log('Default staff initialization attempted');
      }
    };
    initDefaultStaff();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        toast.error('ログインに失敗しました: ' + error.message);
        return;
      }

      if (data.user?.user_metadata?.role !== 'staff') {
        await supabase.auth.signOut();
        toast.error('スタッフアカウントではありません');
        return;
      }

      toast.success('ログインしました');
      navigate('/staff/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('ログインエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-6 py-12">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border-2 border-slate-200/60">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-900/50">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl text-slate-900 mb-3 tracking-tight">
              スタッフログイン
            </h1>
            <p className="text-slate-600 tracking-wide">
              株式会社大幸 管理画面
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-slate-700 mb-3 tracking-wide">
                メールアドレス
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full pl-12 pr-5 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                  placeholder="メールアドレスを入力"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-slate-700 mb-3 tracking-wide">
                パスワード
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-12 pr-5 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                  placeholder="パスワードを入力"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-10 py-5 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl hover:from-blue-800 hover:to-blue-600 transition-all duration-500 shadow-xl shadow-blue-900/25 hover:shadow-2xl hover:shadow-blue-900/40 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'ログイン中...' : 'ログイン'}
            </button>
          </form>

          <div className="mt-8">
            <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200/60">
              <p className="text-slate-600 text-sm text-center tracking-wide">
                このページはスタッフ専用です
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
