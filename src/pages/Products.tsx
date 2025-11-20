import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { products, categories } from '../data/productsData';

export function Products() {
  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24">
      {/* Header */}
      <section className="py-12 sm:py-32 px-6 sm:px-8 lg:px-12 border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl text-slate-900 mb-8 tracking-tight">
              商品一覧
            </h1>
            <p className="text-slate-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed tracking-wide">
              多様な製品をご用意しています。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Quick Links */}
      <section className="py-8 sm:py-16 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/products/categories/${category.id}`}
                  className="block p-6 bg-white rounded-2xl border-2 border-slate-200/60 hover:border-blue-200 hover:shadow-xl transition-all duration-500 text-center group"
                >
                  <div className="text-slate-700 group-hover:text-blue-800 transition-colors duration-300 tracking-wide">
                    {category.title}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Grid */}
      <section className="py-8 sm:py-32 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/products/detail/${product.id}`}
                  className="block group h-full"
                >
                  <div className="h-full border-2 border-slate-200/60 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-slate-300/50 hover:border-blue-200 transition-all duration-500 bg-white flex flex-col">
                    {/* Image */}
                    <div className="aspect-square overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-6 flex-1 flex flex-col">
                      <div className="inline-block px-2 py-1 rounded-full bg-slate-100 text-slate-700 text-xs mb-2 self-start">
                        {product.categoryName}
                      </div>

                      <h2 className="text-sm sm:text-lg text-slate-900 mb-2 group-hover:text-blue-800 transition-colors duration-300">
                        {product.title}
                      </h2>

                      <p className="hidden sm:block text-slate-600 leading-relaxed mb-3 flex-1 text-sm">
                        {product.description}
                      </p>

                      <div className="flex items-center gap-2 text-blue-800 group-hover:gap-3 transition-all duration-300 text-xs sm:text-sm">
                        <span>詳細</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl sm:text-5xl text-slate-900 mb-8 tracking-tight">
              製品についてのご相談
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-10 tracking-wide">
              最適な製品をご提案いたします。お気軽にお問い合わせください。
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl hover:from-blue-800 hover:to-blue-600 transition-all duration-500 shadow-xl shadow-blue-900/25 hover:shadow-2xl hover:shadow-blue-900/40 tracking-wide"
            >
              <span>お問い合わせ</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
