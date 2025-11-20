import { motion } from 'motion/react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, Target, Package, Lightbulb } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { products, categories } from '../../data/productsData';

const iconMap = {
  'easy-to-use': Sparkles,
  'unique-solution': Target,
  'standard': Package,
  'solutions': Lightbulb,
};

const colorMap = {
  blue: {
    badge: 'bg-blue-50 border-blue-100 text-blue-600',
    button: 'bg-blue-600 hover:bg-blue-700',
  },
  purple: {
    badge: 'bg-purple-50 border-purple-100 text-purple-600',
    button: 'bg-purple-600 hover:bg-purple-700',
  },
  green: {
    badge: 'bg-green-50 border-green-100 text-green-600',
    button: 'bg-green-600 hover:bg-green-700',
  },
  orange: {
    badge: 'bg-orange-50 border-orange-100 text-orange-600',
    button: 'bg-orange-600 hover:bg-orange-700',
  },
};

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categories.find((c) => c.id === categoryId);
  const categoryProducts = products.filter((p) => p.category === categoryId);

  if (!category) {
    return <Navigate to="/products" replace />;
  }

  const Icon = iconMap[categoryId as keyof typeof iconMap];
  const colors = colorMap[category.color as keyof typeof colorMap];

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24">
      {/* Breadcrumb */}
      <section className="py-6 px-6 sm:px-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">商品一覧に戻る</span>
          </Link>
        </div>
      </section>

      {/* Header */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${colors.badge}`}>
              <Icon className="w-4 h-4" />
              <span className="text-sm">{category.title}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6">
              {category.title}
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              {category.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/products/detail/${product.id}`}
                  className="block group h-full"
                >
                  <div className="h-full border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white flex flex-col">
                    {/* Image */}
                    <div className="aspect-square overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h2 className="text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {product.title}
                      </h2>

                      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                        {product.description}
                      </p>

                      <div className="flex items-center gap-2 text-blue-600 group-hover:gap-4 transition-all">
                        <span className="text-sm">詳しく見る</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl text-gray-900 mb-6">
              製品についてのご相談
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              お客様のニーズに合わせた最適な製品をご提案いたします。<br />
              まずはお気軽にお問い合わせください。
            </p>
            <Link
              to="/contact"
              className={`inline-flex items-center gap-2 px-8 py-4 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl ${colors.button}`}
            >
              お問い合わせ
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
