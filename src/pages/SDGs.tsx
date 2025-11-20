import { motion } from 'motion/react';
import { Leaf, Users, Wrench, Globe } from 'lucide-react';
import sdgsDeclarationImage from 'figma:asset/b8e240f2490beb1935f45cb74569c6b7232fce32.png';
import sdgsGoalsImage from 'figma:asset/8fcefce4ade855ca728176f5935db5a81c698ad1.png';

const initiatives = [
  {
    icon: Wrench,
    title: '技術',
    description: '60年の経験とデジタル印刷技術で、生産性改善とセキュリティ強化を実現',
    details: 'デジタル印刷での生産性改善、警告シール製造、個人向けシール印刷',
    goals: ['3', '9', '17'],
  },
  {
    icon: Users,
    title: '働き方',
    description: '個々を尊重し、年齢・性別・国籍に関わらず活躍できる職場づくり',
    details: '多様な人材活用、従業員の生活支援、風通しの良い職場づくり',
    goals: ['4', '5', '8', '10'],
  },
  {
    icon: Leaf,
    title: '環境対策',
    description: '環境に配慮した対策とソリューション提案で省エネ・廃棄物削減',
    details: 'デジタル印刷での紙資源削減、ハイブリッドカー導入',
    goals: ['7', '14', '15'],
  },
  {
    icon: Globe,
    title: '社会貢献',
    description: '地域に根付いた企業として、地域社会に貢献',
    details: '交通安全協会等スポンサー協賛',
    goals: ['11', '16', '17'],
  },
];

export function SDGs() {
  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24">
      {/* Header */}
      <section className="py-8 sm:py-24 px-6 sm:px-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6">
              SDGsへの取り組み
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              SDGsの達成に向けた取組みを行っていく事を宣言します。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Declaration Image */}
      <section className="py-8 sm:py-24 px-6 sm:px-8 bg-gradient-to-b from-green-50/30 to-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
          >
            <img
              src={sdgsDeclarationImage}
              alt="株式会社大幸 SDGs宣言"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* What is SDGs */}
      <section className="py-8 sm:py-24 px-6 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl text-gray-900 mb-6">
              持続可能な開発目標 SDGs（エス・ディー・ジーズ）とは
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-2xl border border-gray-200 bg-gray-50">
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                持続可能な開発目標（SDGs）は、2030年までに持続可能でよりよい世界を目指す国際目標です。17のゴール・169のターゲットから構成され、地球上の「誰一人取り残さない」ことを誓っています。
              </p>
              <div className="mt-6 pt-6 border-t border-gray-300">
                <a
                  href="https://www.mofa.go.jp/mofaj/gaiko/oda/sdgs/about/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors text-sm"
                >
                  外務省 SDGsについて →
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl overflow-hidden shadow-xl border border-gray-200"
            >
              <img
                src={sdgsGoalsImage}
                alt="SDGs 17のゴール"
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Initiatives */}
      <section className="py-8 sm:py-24 px-6 sm:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 sm:mb-16"
          >
            
            <h2 className="text-3xl sm:text-4xl text-gray-900">
              取組み
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-4 sm:p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center border border-green-200">
                    <initiative.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl text-gray-900">{initiative.title}</h3>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-3 text-sm">
                  {initiative.description}
                </p>
                
                <div className="p-3 rounded-lg bg-green-50/50 border border-green-100 mb-3">
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {initiative.details}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {initiative.goals.map((goal) => (
                    <span
                      key={goal}
                      className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs"
                    >
                      目標 {goal}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-8 sm:py-24 px-6 sm:px-8 bg-gradient-to-b from-white to-green-50/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center p-8 sm:p-12 rounded-2xl border border-green-200 bg-white shadow-lg"
          >
            <h3 className="text-2xl sm:text-3xl text-gray-900 mb-6">
              持続可能な社会の実現に向けて
            </h3>
            <p className="text-gray-600 leading-relaxed">
              株式会社大幸は、これからも地域社会の一員として、<br className="hidden sm:block" />
              環境保全や社会貢献活動を通じて、<br className="hidden sm:block" />
              持続可能な社会の実現に貢献してまいります。
            </p>
            <div className="mt-8 text-gray-500 text-sm">
              2021年2月3日<br />
              株式会社 大幸　代表取締役　大森　章弘
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
