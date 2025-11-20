import { motion } from 'motion/react';
import { Users, Briefcase, UserCheck, Clock, MapPin, Mail, Phone } from 'lucide-react';

export function Recruitment() {
  const positions = [
    {
      category: '正社員（オペレーター）',
      jobs: [
        {
          title: '印刷オペレーター',
          count: '1名',
          status: '募集中',
          isOpen: true,
        },
        {
          title: '営業職',
          count: '1名',
          status: '募集中',
          isOpen: true,
        },
      ],
    },
    {
      category: 'パート',
      jobs: [],
      message: '現在募集は行っておりません。',
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24">
      {/* Header */}
      <section className="py-8 sm:py-24 px-6 sm:px-8 border-b border-gray-100 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6">
              採用情報
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              共に成長できる仲間を募集しています。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Recruitment Positions */}
      <section className="py-8 sm:py-24 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {positions.map((section, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl text-gray-900">{section.category}</h2>
                </div>

                {section.jobs && section.jobs.length > 0 ? (
                  <div className="space-y-4">
                    {section.jobs.map((job, jobIndex) => (
                      <div
                        key={jobIndex}
                        className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <Briefcase className="w-5 h-5 text-gray-600 flex-shrink-0" />
                            <div>
                              <h3 className="text-lg text-gray-900">{job.title}</h3>
                              <p className="text-gray-600 text-sm mt-1">募集人数: {job.count}</p>
                            </div>
                          </div>
                          <div
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                              job.isOpen
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-gray-100 border border-gray-200'
                            }`}
                          >
                            <UserCheck
                              className={`w-4 h-4 ${
                                job.isOpen ? 'text-green-600' : 'text-gray-500'
                              }`}
                            />
                            <span
                              className={`text-sm ${
                                job.isOpen ? 'text-green-700' : 'text-gray-600'
                              }`}
                            >
                              {job.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                    <p className="text-gray-600">{section.message}</p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Application Information */}
      <section className="py-8 sm:py-24 px-6 sm:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl text-gray-900 mb-8 text-center">応募方法</h2>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="space-y-6">
                <div className="p-4 sm:p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
                    お電話またはメールにて受け付けております。
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm mb-1">電話</div>
                      <a
                        href="tel:052-911-5551"
                        className="text-gray-900 hover:text-blue-600 transition-colors text-lg"
                      >
                        052-911-5551
                      </a>
                      <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>平日 9:00 - 18:00</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm mb-1">メール</div>
                      <a
                        href="mailto:info@daikou-print.co.jp"
                        className="text-gray-900 hover:text-blue-600 transition-colors break-all"
                      >
                        info@daikou-print.co.jp
                      </a>
                      <p className="text-gray-600 text-sm mt-2">
                        件名に「採用応募」と記載してください
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-1">勤務地</div>
                    <p className="text-gray-900">
                      〒462-0052<br />
                      愛知県名古屋市北区天道町4丁目11番地
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-gray-800 text-xs sm:text-sm leading-relaxed">
                ※ 応募書類は返却いたしません ※ 個人情報は採用選考以外には使用しません
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
