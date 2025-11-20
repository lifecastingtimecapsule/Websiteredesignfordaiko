import { motion } from 'motion/react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { 
  ShoppingCart, 
  Upload, 
  CreditCard, 
  XCircle, 
  Truck,
  FileText,
  AlertCircle,
  CheckCircle2,
  Phone,
  Mail,
  File,
  X
} from 'lucide-react';

// 重要な詳細情報
const detailedSections = [
  {
    id: 'data',
    title: '入稿データについて',
    icon: Upload,
    color: 'purple',
    summary: '完全データ（Adobe Illustrator形式、フォントアウトライン済み）での入稿をお願いします。',
    details: [
      {
        title: 'Office系データ（Word・Excel・PowerPoint）について',
        points: [
          'Office系データでのご入稿も受け付けておりますが、開くパソコンによってレイアウトや書体が変わるため、印刷用データへの再作成が必要です（別途制作料）',
          'レイアウトや書体を原稿どおりでご希望の場合は、PDF変換またはプリントアウトしたものをお送りください',
          '使用した写真データは元データも併せてお送りください',
        ],
      },
    ],
  },
  {
    id: 'cancel',
    title: 'キャンセルについて',
    icon: XCircle,
    color: 'orange',
    summary: '受注製造のため、発注後のキャンセルは基本的にできません。',
    details: [
      {
        title: 'キャンセル料',
        points: [
          'ご注文確定まで：無料',
          'データチェック完了後：印刷料金の50％',
          '刷版・印刷工程開始後：印刷料金の全額',
        ],
        note: 'キャンセル料は当社の進行状況によりますのであらかじめご了承ください。',
      },
    ],
  },
];

// 簡潔な情報
const quickInfoSections = [
  {
    id: 'order',
    title: 'ご注文の流れ',
    icon: ShoppingCart,
    color: 'blue',
    items: [
      { label: '①', text: 'お問い合わせフォームまたは下記の注文フォームよりシール詳細をご入力' },
      { label: '②', text: '弊社担当より返答（電話またはメールをご選択いただけます）' },
      { label: '③', text: 'お見積もりをご確認後、ご発注' },
    ],
  },
  {
    id: 'payment',
    title: 'お支払い方法',
    icon: CreditCard,
    color: 'green',
    items: [
      { label: '方法', text: '商品納品時に全額代金引換' },
      { label: '流れ', text: 'お見積もりをご確認・ご納得いただいた上で受注製造いたします' },
    ],
  },
  {
    id: 'shipping',
    title: '商品の受け取り',
    icon: Truck,
    color: 'indigo',
    items: [
      { label: '配送', text: 'ヤマト運輸（沖縄・一部離島はゆうパック）の代引きサービス ※手数料はお客様負担' },
      { label: '来社', text: '弊社での受け取りも可能（現金払い）。ご注文時に「来社受け取り希望」とご記入ください' },
    ],
  },
];

const PAPER_TYPES = [
  '上質タック',
  '上質訂正タック',
  'アートタック',
  'アート訂正タック',
  'ミラーコートタック',
  'ミラーコート訂正',
  'マットコート',
  'マットコート訂正',
  'ユポタック',
  'ユポ訂正タック'
];

export function Order() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    phone: '',
    responseType: 'email' as 'email' | 'phone',
    submitType: 'estimate' as 'estimate' | 'order',
    productName: '',
    desiredDelivery: '',
    widthSize: '',
    heightSize: '',
    colorCount: '4',
    paperType: '',
    laminate: 'none' as 'none' | 'gloss' | 'matte',
    finishing: 'sheet' as 'sheet' | 'single' | 'roll',
    quantity: '',
    usage: 'indoor' as 'indoor' | 'outdoor',
    dataStatus: 'new' as 'new' | 'office' | 'pdf' | 'illustrator',
    deliveryMethod: 'shipping' as 'shipping' | 'pickup',
    details: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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
    
    if (!formData.details.trim()) {
      toast.error('備考欄を入力してください。');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // サーバーに送信するデータを準備
      const submissionData = {
        ...formData,
        fileCount: uploadedFiles.length,
        fileNames: uploadedFiles.map(f => f.name)
      };

      // サーバーにデータを送信
      const response = await fetch(
        `https://${(await import('../utils/supabase/info')).projectId}.supabase.co/functions/v1/make-server-249c283c/order/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await import('../utils/supabase/info')).publicAnonKey}`
          },
          body: JSON.stringify(submissionData)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit order');
      }

      const result = await response.json();
      
      const message = formData.submitType === 'order' 
        ? 'ご注文を受け付けました。担当者よりご連絡いたします。'
        : 'お見積もり依頼を受け付けました。担当者よりご連絡いたします。';
      
      if (uploadedFiles.length > 0) {
        toast.success(`${message}（ファイル${uploadedFiles.length}件添付）`);
      } else {
        toast.success(message);
      }
      
      // Reset form
      setFormData({
        companyName: '',
        name: '',
        email: '',
        phone: '',
        responseType: 'email',
        submitType: 'estimate',
        productName: '',
        desiredDelivery: '',
        widthSize: '',
        heightSize: '',
        colorCount: '4',
        paperType: '',
        laminate: 'none',
        finishing: 'sheet',
        quantity: '',
        usage: 'indoor',
        dataStatus: 'new',
        deliveryMethod: 'shipping',
        details: '',
      });
      setUploadedFiles([]);
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
      toast.success(`${newFiles.length}件のファイルを追加しました`);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    toast.info('ファイルを削除しました');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24">
      {/* Header */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 border-b border-slate-200/60 bg-gradient-to-b from-blue-50/50 via-white to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl text-slate-900 mb-8 tracking-tight">
              ネットからのご注文
            </h1>
            <p className="text-slate-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed tracking-wide">
              オンラインで簡単にご注文いただけます。<br className="hidden sm:block" />
              詳細内容をご確認の上、フォームよりお問い合わせください。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-slate-50/30 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickInfoSections.map((section, index) => {
              const Icon = section.icon;
              const colorClasses = {
                blue: 'bg-blue-900 shadow-blue-900/30',
                green: 'bg-emerald-700 shadow-emerald-700/30',
                indigo: 'bg-indigo-800 shadow-indigo-800/30',
              };

              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl border-2 border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-12 h-12 rounded-xl ${colorClasses[section.color as keyof typeof colorClasses]} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl text-slate-900 tracking-tight">{section.title}</h3>
                    </div>
                    <div className="space-y-3">
                      {section.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="inline-flex items-center justify-center min-w-[32px] h-8 px-2.5 bg-slate-100 text-slate-700 rounded-lg text-sm flex-shrink-0">
                            {item.label}
                          </span>
                          <p className="text-slate-600 text-sm leading-relaxed pt-1.5 tracking-wide">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Information Sections */}
      <section className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {detailedSections.map((section, index) => {
              const Icon = section.icon;
              const colorClasses = {
                purple: 'from-purple-50 to-purple-50/30 border-purple-200/50 text-purple-800',
                orange: 'from-orange-50 to-orange-50/30 border-orange-200/50 text-orange-800',
              };

              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className="bg-white rounded-3xl border-2 border-slate-200/60 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
                >
                  <div className={`p-6 border-b-2 border-slate-100 bg-gradient-to-r ${colorClasses[section.color as keyof typeof colorClasses]}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/90 flex items-center justify-center shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl tracking-tight">{section.title}</h2>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <p className="text-slate-700 leading-relaxed tracking-wide mb-6 pb-6 border-b-2 border-slate-100">
                      {section.summary}
                    </p>

                    {section.details.map((detail, i) => (
                      <div key={i} className="space-y-4">
                        <h3 className="text-lg text-slate-900 tracking-wide">{detail.title}</h3>
                        <ul className="space-y-3">
                          {detail.points.map((point, j) => (
                            <li key={j} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-600 text-sm leading-relaxed tracking-wide">{point}</span>
                            </li>
                          ))}
                        </ul>
                        {detail.note && (
                          <div className="mt-5 p-4 bg-amber-50 border-2 border-amber-200/60 rounded-xl">
                            <div className="flex items-start gap-3">
                              <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                              <p className="text-amber-900 text-sm tracking-wide">{detail.note}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl text-slate-900 mb-6 tracking-tight">
                ご注文フォーム
              </h2>
              <p className="text-slate-600 text-lg tracking-wide">
                以下のフォームに必要事項をご記入の上、送信してください。
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Submit Type Selection */}
              <div>
                <label className="block text-slate-700 mb-4 tracking-wide">
                  ご依頼内容 <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                    <input
                      type="radio"
                      name="submitType"
                      value="estimate"
                      checked={formData.submitType === 'estimate'}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-700"
                    />
                    <span className="text-slate-700 tracking-wide">見積もり依頼</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                    <input
                      type="radio"
                      name="submitType"
                      value="order"
                      checked={formData.submitType === 'order'}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-700"
                    />
                    <span className="text-slate-700 tracking-wide">注文</span>
                  </label>
                </div>
              </div>

              {/* Company and Name */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-slate-700 mb-3 tracking-wide">
                    会社名・団体名
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white shadow-sm"
                    placeholder="株式会社大幸"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-slate-700 mb-3 tracking-wide">
                    お名前 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white shadow-sm"
                    placeholder="山田 太郎"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-slate-700 mb-3 tracking-wide">
                    メールアドレス <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white shadow-sm"
                    placeholder="example@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-slate-700 mb-3 tracking-wide">
                    電話番号 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white shadow-sm"
                    placeholder="052-903-8273"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="productName" className="block text-slate-700 mb-3 tracking-wide">
                    お見積 品名
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white shadow-sm"
                    placeholder="シール、ラベルなど"
                  />
                </div>

                <div>
                  <label htmlFor="desiredDelivery" className="block text-slate-700 mb-3 tracking-wide">
                    ご希望納期
                  </label>
                  <input
                    type="text"
                    id="desiredDelivery"
                    name="desiredDelivery"
                    value={formData.desiredDelivery}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white shadow-sm"
                    placeholder="例：2週間後、○月○日まで"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="widthSize" className="block text-slate-700 mb-3 tracking-wide">
                    横サイズ・形状
                  </label>
                  <input
                    type="text"
                    id="widthSize"
                    name="widthSize"
                    value={formData.widthSize}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white shadow-sm"
                    placeholder="例：50mm"
                  />
                </div>

                <div>
                  <label htmlFor="heightSize" className="block text-slate-700 mb-3 tracking-wide">
                    縦サイズ・形状
                  </label>
                  <input
                    type="text"
                    id="heightSize"
                    name="heightSize"
                    value={formData.heightSize}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white shadow-sm"
                    placeholder="例：30mm"
                  />
                </div>
              </div>

              {/* Color Count */}
              <div>
                <label className="block text-slate-700 mb-4 tracking-wide">
                  色数
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['1', '2', '3', '4', '4+white', 'other'].map((color) => (
                    <label key={color} className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                      <input
                        type="radio"
                        name="colorCount"
                        value={color}
                        checked={formData.colorCount === color}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-700"
                      />
                      <span className="text-slate-700 tracking-wide">
                        {color === '1' && '1色'}
                        {color === '2' && '2色'}
                        {color === '3' && '3色'}
                        {color === '4' && '4色'}
                        {color === '4+white' && '4色+白'}
                        {color === 'other' && 'その他'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Paper Type */}
                <div>
                  <label htmlFor="paperType" className="block text-slate-700 mb-3 tracking-wide">
                    用紙
                  </label>
                  <select
                    id="paperType"
                    name="paperType"
                    value={formData.paperType}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white shadow-sm"
                  >
                    <option value="">選択してください</option>
                    {PAPER_TYPES.map((paper) => (
                      <option key={paper} value={paper}>
                        {paper}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label htmlFor="quantity" className="block text-slate-700 mb-3 tracking-wide">
                    数量
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white shadow-sm"
                    placeholder="例：1000枚"
                  />
                </div>
              </div>

              {/* Laminate and Usage in 2 columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Laminate */}
                <div>
                  <label className="block text-slate-700 mb-4 tracking-wide">
                    ラミネート加工
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                      <input
                        type="radio"
                        name="laminate"
                        value="none"
                        checked={formData.laminate === 'none'}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-700"
                      />
                      <span className="text-slate-700 tracking-wide">なし</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                      <input
                        type="radio"
                        name="laminate"
                        value="gloss"
                        checked={formData.laminate === 'gloss'}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-700"
                      />
                      <span className="text-slate-700 tracking-wide">グロスラミネート</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                      <input
                        type="radio"
                        name="laminate"
                        value="matte"
                        checked={formData.laminate === 'matte'}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-700"
                      />
                      <span className="text-slate-700 tracking-wide">マットラミネート</span>
                    </label>
                  </div>
                </div>

                {/* Usage */}
                <div>
                  <label className="block text-slate-700 mb-4 tracking-wide">
                    使用用途
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                      <input
                        type="radio"
                        name="usage"
                        value="indoor"
                        checked={formData.usage === 'indoor'}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-700"
                      />
                      <span className="text-slate-700 tracking-wide">屋内</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                      <input
                        type="radio"
                        name="usage"
                        value="outdoor"
                        checked={formData.usage === 'outdoor'}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-700"
                      />
                      <span className="text-slate-700 tracking-wide">屋外</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Finishing and Data Status in 2 columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Finishing */}
                <div>
                  <label className="block text-slate-700 mb-4 tracking-wide">
                    仕上げ方法
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                      <input
                        type="radio"
                        name="finishing"
                        value="sheet"
                        checked={formData.finishing === 'sheet'}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-700"
                      />
                      <span className="text-slate-700 tracking-wide">適量枚数シート仕上げ</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                      <input
                        type="radio"
                        name="finishing"
                        value="single"
                        checked={formData.finishing === 'single'}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-700"
                      />
                      <span className="text-slate-700 tracking-wide">1シート1枚仕上げ</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                      <input
                        type="radio"
                        name="finishing"
                        value="roll"
                        checked={formData.finishing === 'roll'}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-700"
                      />
                      <span className="text-slate-700 tracking-wide">ロール仕上げ</span>
                    </label>
                  </div>
                </div>

                {/* Data Status */}
                <div>
                  <label className="block text-slate-700 mb-4 tracking-wide">
                    データの有無
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                      <input
                        type="radio"
                        name="dataStatus"
                        value="new"
                        checked={formData.dataStatus === 'new'}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-700"
                      />
                      <span className="text-slate-700 tracking-wide">新規データ作成</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                      <input
                        type="radio"
                        name="dataStatus"
                        value="office"
                        checked={formData.dataStatus === 'office'}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-700"
                      />
                      <span className="text-slate-700 tracking-wide">office系データ有り</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                      <input
                        type="radio"
                        name="dataStatus"
                        value="pdf"
                        checked={formData.dataStatus === 'pdf'}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-700"
                      />
                      <span className="text-slate-700 tracking-wide">PDFデータ有り</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                      <input
                        type="radio"
                        name="dataStatus"
                        value="illustrator"
                        checked={formData.dataStatus === 'illustrator'}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-700"
                      />
                      <span className="text-slate-700 tracking-wide">イラストレーターデータ有り</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              <div>
                <label className="block text-slate-700 mb-4 tracking-wide">
                  受け取り方法 <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="shipping"
                      checked={formData.deliveryMethod === 'shipping'}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-700"
                    />
                    <Truck className="w-5 h-5 text-slate-600" />
                    <span className="text-slate-700 tracking-wide">商品発送</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === 'pickup'}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-700"
                    />
                    <span className="text-slate-700 tracking-wide">来社受け取り希望</span>
                  </label>
                </div>
              </div>

              {/* Response Type */}
              <div>
                <label className="block text-slate-700 mb-4 tracking-wide">
                  ご返答のご希望 <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                    <input
                      type="radio"
                      name="responseType"
                      value="phone"
                      checked={formData.responseType === 'phone'}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-700"
                    />
                    <span className="text-slate-700 tracking-wide">電話希望</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all bg-white">
                    <input
                      type="radio"
                      name="responseType"
                      value="email"
                      checked={formData.responseType === 'email'}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-700"
                    />
                    <span className="text-slate-700 tracking-wide">メール希望</span>
                  </label>
                </div>
              </div>

              {/* Details */}
              <div>
                <label htmlFor="details" className="block text-slate-700 mb-3 tracking-wide">
                  備考欄 <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-white shadow-sm"
                  placeholder="ご質問やご要望などをご記入ください"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-slate-700 mb-3 tracking-wide">
                  入稿データのアップロード
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center hover:border-blue-400 transition-all bg-slate-50/50">
                  <input
                    type="file"
                    id="fileUpload"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".ai,.pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  />
                  <label
                    htmlFor="fileUpload"
                    className="cursor-pointer flex flex-col items-center gap-4"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl flex items-center justify-center shadow-sm">
                      <Upload className="w-10 h-10 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-slate-900 mb-2 tracking-wide text-lg">
                        クリックしてファイルを選択
                      </p>
                      <p className="text-slate-500 tracking-wide">
                        Adobe Illustrator, PDF, Office系データ、画像ファイル
                      </p>
                    </div>
                  </label>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <p className="text-slate-700 mb-4 tracking-wide">
                      アップロード済み ({uploadedFiles.length}件)
                    </p>
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl hover:border-blue-200 transition-all"
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <File className="w-6 h-6 text-blue-700" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-slate-900 truncate tracking-wide">
                              {file.name}
                            </p>
                            <p className="text-slate-500 text-sm tracking-wide">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="ml-4 p-2 text-slate-400 hover:text-red-600 transition-colors flex-shrink-0 rounded-xl hover:bg-red-50"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 p-6 bg-blue-50 border-2 border-blue-200/60 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-900">
                      <p className="mb-2 tracking-wide">入稿データについて</p>
                      <ul className="text-blue-800 space-y-2 ml-5 list-disc tracking-wide">
                        <li>完全データ（Illustrator形式、フォントアウトライン済み）推奨</li>
                        <li>Office系データは別途制作料が必要です</li>
                        <li>写真データは元のデータも併せて送付ください</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl hover:from-blue-800 hover:to-blue-600 transition-all duration-500 shadow-xl shadow-blue-900/25 hover:shadow-2xl hover:shadow-blue-900/40 tracking-wide text-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-900 disabled:hover:to-blue-700"
                >
                  {isSubmitting ? '送信中...' : '送信する'}
                </button>
                <p className="text-center text-slate-500 mt-6 tracking-wide">
                  送信後、担当者よりご連絡させていただきます。
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
