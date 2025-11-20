import { motion } from 'motion/react';
import { Factory, MapPin, Phone, Mail } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const companyInfo = [
  { label: '商号', value: '株式会社 大幸' },
  { label: '所在地', value: '〒462-0034 名古屋市北区天道町4丁目11' },
  { label: 'TEL', value: '052-903-8273' },
  { label: 'FAX', value: '052-903-8274' },
  { label: '代表取締役', value: '大森 章弘' },
  { label: '法人設立', value: '1982年6月1日' },
  { label: '資本金', value: '1,000万円' },
  { label: '事業内容', value: 'シール・ラベル印刷、オフセット・オンデマンド印刷、箔押し・ラミネート加工、その他商業印刷全般' },
];

const equipmentList = [
  {
    category: 'ラベル印刷機',
    items: [
      '5色間欠輪転式印刷機 1台',
      '4色間欠輪転式印刷機 2台',
      '2色間欠輪転式印刷機 1台',
      '平圧式印刷機 2台',
      '可変印字ラベル機 1台',
      'オンデマンド出力機 2台',
      'インクジェット出力機 2台',
    ],
  },
  {
    category: '加工機',
    items: [
      'オンデマンド箔押機 1台',
      'ラミネート加工機 1台',
      'カッティングプロッター 2台',
      'スリッター機 2台',
      'ラベル画像検品機 1台',
      'ラベル計量検品機 2台',
      'PTカッター 3台',
      'シュリンク包装機 1台',
      'エアー緩衝材製造機 1台',
      '帯掛機 3台',
      '断裁機 1台',
    ],
  },
];

export function Company() {
  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24">
      {/* Header: 青と白でシンプルに */}
      <section className="py-16 sm:py-24 px-6 relative overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-100/50 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              会社情報
            </h1>
            <div className="w-16 h-1 bg-sky-500 mx-auto rounded-full mb-6" />
            <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
              1982年の創業以来、私たちは「信頼」を第一に歩んでまいりました。<br />
              確かな技術と誠実な対応で、お客様のビジネスを支え続けます。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Message Area: 緑のアクセントは代表名のみ */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-sky-500 rounded-full" />
                代表メッセージ
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  長年の実績と技術力で、シール・ラベル印刷を中心に多様な印刷ニーズにお応えしています。デジタル社会にも柔軟に対応し、新しいモノづくりにチャレンジし続けます。
                </p>
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <p className="text-sm text-slate-500 mb-1">代表取締役</p>
                  <p className="text-xl font-bold text-emerald-600">大森 章弘</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden" style={{boxShadow: '0 20px 80px -10px rgba(56, 189, 248, 0.25)'}}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758873268631-fa944fc5cad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjB0ZWFtfGVufDF8fHx8MTc2MTcyNjY4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="オフィス"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Info Table: 青のアクセントカラー */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-slate-900 mb-10 text-center"
          >
            会社概要
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm"
          >
            <table className="w-full text-left border-collapse">
              <tbody>
                {companyInfo.map((info, index) => (
                  <tr key={info.label} className="border-b border-slate-50 last:border-0">
                    <th className="py-5 px-6 bg-sky-50/30 text-sky-900 font-medium w-1/3 sm:w-1/4">
                      {info.label}
                    </th>
                    <td className="py-5 px-6 text-slate-700">
                      {info.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Equipment: 青のアクセント */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Factory className="w-6 h-6 text-sky-600" />
              設備一覧
            </h2>
            <p className="text-slate-600">
              最新の���刷機器と加工機械を完備し、高品質な製品をご提供いたします。
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {equipmentList.map((equipment, idx) => (
              <motion.div
                key={equipment.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="bg-slate-50 rounded-2xl p-8"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-6 pb-3 border-b-2 border-sky-500">
                  {equipment.category}
                </h3>
                <ul className="space-y-3">
                  {equipment.items.map((item, index) => (
                    <li
                      key={index}
                      className="text-slate-700 leading-relaxed flex items-start gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Access: 青のアイコン */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              アクセス
            </h2>
            <div className="w-12 h-1 bg-sky-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl text-center shadow-sm"
            >
              <div className="w-14 h-14 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-sky-600" />
              </div>
              <h3 className="text-sm text-slate-700 font-medium mb-3 tracking-wider uppercase">所在地</h3>
              <p className="text-slate-900 font-medium leading-relaxed">
                〒462-0034<br />
                名古屋市北区天道町4丁目11
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl text-center shadow-sm"
            >
              <div className="w-14 h-14 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-sky-600" />
              </div>
              <h3 className="text-sm text-slate-700 font-medium mb-3 tracking-wider uppercase">電話</h3>
              <a href="tel:052-903-8273" className="text-xl font-bold text-slate-900 hover:text-sky-600 transition-colors block">
                052-903-8273
              </a>
              <p className="text-slate-600 text-sm mt-2">平日 9:00 - 18:00</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl text-center shadow-sm"
            >
              <div className="w-14 h-14 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-sky-600" />
              </div>
              <h3 className="text-sm text-slate-700 font-medium mb-3 tracking-wider uppercase">メール</h3>
              <a href="mailto:daikoinfo@daiko-lsf.jp" className="text-lg font-bold text-slate-900 hover:text-sky-600 transition-colors break-all">
                daikoinfo@daiko-lsf.jp
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg h-96"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.4962835348764!2d136.91427831562884!3d35.20481558031995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6003786e8e8e8e8f%3A0x8e8e8e8e8e8e8e8e!2z5qCq5byP5Lya56S-IOWkp-W5uA!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="株式会社大幸 所在地"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}