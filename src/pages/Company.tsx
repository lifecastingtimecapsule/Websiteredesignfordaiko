import { motion } from 'motion/react';
import { Factory } from 'lucide-react';
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
      {/* Header */}
      <section className="py-8 sm:py-16 px-4 sm:px-8 lg:px-12 border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl text-slate-900 mb-4 tracking-tight">
              会社情報
            </h1>
            <p className="text-slate-600 tracking-wide">
              1982年創業。信頼と品質で歩み続けています。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Message */}
      <section className="py-8 sm:py-16 px-4 sm:px-8 lg:px-12 bg-slate-50/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <h2 className="text-2xl sm:text-3xl text-slate-900 mb-6 pb-3 border-b-2 border-blue-700">
              代表メッセージ
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  長年の実績と技術力で、シール・ラベル印刷を中心に多様な印刷ニーズにお応えしています。デジタル社会にも柔軟に対応し、新しいモノづくりにチャレンジし続けます。
                </p>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-slate-600 text-sm">代表取締役</p>
                  <p className="text-xl text-slate-900 mt-1">大森 章弘</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border border-slate-200">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758873268631-fa944fc5cad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjB0ZWFtfGVufDF8fHx8MTc2MTcyNjY4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="オフィス"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-8 sm:py-16 px-4 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl text-slate-900 mb-6 pb-3 border-b-2 border-blue-700">
              会社概要
            </h2>

            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {companyInfo.map((info, index) => (
                    <tr
                      key={info.label}
                      className={index !== companyInfo.length - 1 ? 'border-b border-slate-200' : ''}
                    >
                      <th className="bg-slate-50 px-4 sm:px-6 py-3 sm:py-4 text-left text-sm text-slate-700 w-32 sm:w-40">
                        {info.label}
                      </th>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-slate-900">
                        {info.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-8 sm:py-16 px-4 sm:px-8 lg:px-12 bg-slate-50/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl text-slate-900 mb-6 pb-3 border-b-2 border-blue-700">
              主要設備
            </h2>

            <div className="space-y-6">
              {equipmentList.map((equipment, index) => (
                <motion.div
                  key={equipment.category}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6"
                >
                  <h3 className="text-lg text-slate-900 mb-4 flex items-center gap-3 pb-3 border-b border-slate-200">
                    <Factory className="w-5 h-5 text-blue-700" />
                    {equipment.category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {equipment.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-700"
                      >
                        <span className="text-blue-700 mt-1">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 sm:py-16 px-4 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl text-slate-900 mb-6 pb-3 border-b-2 border-blue-700">
              アクセス
            </h2>
            <p className="text-slate-600 mb-6">〒462-0034 名古屋市北区天道町4丁目11</p>

            <div className="rounded-lg overflow-hidden border border-slate-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d815.003201288251!2d136.91829!3d35.20615!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600373f193a1421f%3A0xb37974aae1dd9e44!2z44ix5aSn5bm4!5e0!3m2!1sja!2sjp!4v1761739927582!5m2!1sja!2sjp"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
