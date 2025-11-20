import { motion } from 'motion/react';
import { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 送信中の場合は処理しない
    if (isSubmitting) {
      return;
    }
    
    // 必須項目のバリデーション
    if (!formData.name.trim()) {
      toast.error('お名前を入力してください。');
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error('メールアドレスを入力してください。');
      return;
    }
    
    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('正しいメールアドレスを入力してください。');
      return;
    }
    
    if (!formData.phone.trim()) {
      toast.error('電話番号を入力してください。');
      return;
    }
    
    if (!formData.message.trim()) {
      toast.error('お問い合わせ内容を入力してください。');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // サーバーにデータを送信
      const response = await fetch(
        `https://${(await import('../utils/supabase/info')).projectId}.supabase.co/functions/v1/make-server-249c283c/contact/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await import('../utils/supabase/info')).publicAnonKey}`
          },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit contact');
      }

      toast.success('お問い合わせを受け付けました。担当者より1営業日以内にご返信いたします。');
      
      // Reset form
      setFormData({
        companyName: '',
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact:', error);
      toast.error('送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24">
      {/* Header */}
      <section className="py-12 sm:py-32 px-6 sm:px-8 lg:px-12 border-b border-slate-200/60 bg-gradient-to-b from-blue-50/50 via-white to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl text-slate-900 mb-8 tracking-tight">
              お問い合わせ
            </h1>
            {/* Information Grid */}
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-6 mb-6 sm:mb-10">
              <div className="p-3 sm:p-6 rounded-2xl bg-white border-2 border-slate-200/60 shadow-lg text-left">
                <ul className="space-y-2 text-slate-700 text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-700 mt-1">•</span>
                    <span className="tracking-wide">商品について知りたい</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-700 mt-1">•</span>
                    <span className="tracking-wide">見積依頼</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 sm:p-6 rounded-2xl bg-white border-2 border-slate-200/60 shadow-lg text-left">
                <ul className="space-y-2 text-slate-700 text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-700 mt-1">•</span>
                    <span className="tracking-wide">商品製作の相談</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-700 mt-1">•</span>
                    <span className="tracking-wide">印刷相談</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="max-w-3xl mx-auto p-3 sm:p-5 bg-amber-50 border-2 border-amber-200/60 rounded-2xl">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 mt-0.5 flex-shrink-0" />
                <p className="text-slate-800 text-xs sm:text-sm leading-relaxed tracking-wide text-left">
                  ※ 注文は注文フォームから ※ 返信がない場合は<a href="mailto:daikoinfo@daiko-lsf.jp" className="text-blue-800 hover:text-blue-900 underline">こちら</a>へ
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 sm:py-12 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl text-slate-900 mb-6 tracking-tight">お問い合わせ先</h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200/60 shadow-lg hover:shadow-xl hover:border-blue-200 transition-all duration-500">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs mb-1.5 tracking-wide">電話</div>
                    <a href="tel:052-911-5551" className="text-slate-900 hover:text-blue-800 transition-colors tracking-wide">
                      052-911-5551
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200/60 shadow-lg hover:shadow-xl hover:border-blue-200 transition-all duration-500">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-700" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-slate-500 text-xs mb-1.5 tracking-wide">メール</div>
                    <a href="mailto:info@daikou-print.co.jp" className="text-slate-900 hover:text-blue-800 transition-colors break-all tracking-wide text-sm">
                      info@daikou-print.co.jp
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200/60 shadow-lg hover:shadow-xl hover:border-blue-200 transition-all duration-500">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs mb-1.5 tracking-wide">住所</div>
                    <p className="text-slate-900 tracking-wide text-sm">
                      〒462-0052<br />
                      名古屋市北区<br />
                      天道町4-11
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200/60 shadow-lg hover:shadow-xl hover:border-blue-200 transition-all duration-500">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs mb-1.5 tracking-wide">営業時間</div>
                    <p className="text-slate-900 tracking-wide text-sm">
                      平日 9:00 - 18:00<br />
                      （土日祝日休業）
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-8 sm:py-16 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border-2 border-slate-200/60">
              <h2 className="text-2xl sm:text-3xl text-slate-900 mb-6 tracking-tight">お問合せフォーム</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Name and Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="companyName" className="block text-slate-700 mb-2 tracking-wide">
                      会社名
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                      placeholder="株式会社〇〇"
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-slate-700 mb-2 tracking-wide">
                      お名前 <span className="text-blue-700">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                      placeholder="山田 太郎"
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-slate-700 mb-2 tracking-wide">
                      メールアドレス <span className="text-blue-700">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                      placeholder="example@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-slate-700 mb-2 tracking-wide">
                      電話番号 <span className="text-blue-700">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                      placeholder="090-1234-5678"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-slate-700 mb-2 tracking-wide">
                    お問い合わせ内容 <span className="text-blue-700">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all resize-none shadow-sm"
                    placeholder="お問い合わせ内容をご記入ください&#10;※ パンフレット希望の方は「パンフレット希望」と記入してください"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl hover:from-blue-800 hover:to-blue-600 transition-all duration-500 flex items-center justify-center gap-3 shadow-xl shadow-blue-900/25 hover:shadow-2xl hover:shadow-blue-900/40 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-900 disabled:hover:to-blue-700"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? '送信中...' : '送信する'}
                </button>
              </form>

              <div className="mt-6 p-4 rounded-2xl bg-blue-50 border-2 border-blue-200/60">
                <p className="text-slate-700 leading-relaxed tracking-wide text-xs sm:text-sm">
                  ※1営業日以内に返信 ※お急ぎの場合はお電話で
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
