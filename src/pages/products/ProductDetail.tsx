import image_01f8fddea3613bbd41a9f34d12d97ca969c049f0 from 'figma:asset/01f8fddea3613bbd41a9f34d12d97ca969c049f0.png';
import image_0cf20b12d0df3a80cf11253e4d8e83b2f42cfe22 from 'figma:asset/0cf20b12d0df3a80cf11253e4d8e83b2f42cfe22.png';
import { motion } from 'motion/react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { products } from '../../data/productsData';

// 封印シールの詳細データ
const sealClosureDetail = {
  images: [
    image_0cf20b12d0df3a80cf11253e4d8e83b2f42cfe22,
    image_01f8fddea3613bbd41a9f34d12d97ca969c049f0,
  ],
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  description: '糊やテープを使わず、簡単に封印することができ、またハサミなどを使わず、簡単に開封することができます。',
  details: 'お好きな大きさやデザインにできます。',
};

// 訂正シールの詳細データ
const correctionSealDetail = {
  subtitle: '用途',
  description: '社名・住所変更や、カタログ・パンフレットの内容変更、印刷ミスの修正などに使用できます。印刷をせず型抜きだけをすることで、被着体の一部を"隠す"ことができます。',
  useCases: [
    '社名変更・住所変更の為、会社案内・DM・封筒などを訂正したい',
    'カタログの不要なプリントを隠す為の目隠し的な役割として',
    '用途にこだわらず被着体の色や柄が写らないシール・ステッカーを作りたい',
  ],
  materials: '訂正シールとしての役割のあるものは上質紙・アート紙・ミラーコート紙・マットコート紙ユポなどがございます。他にも裏面が移らない素材としてホイル紙やメタリックフィルムなども場合によってはご利用いただけます。',
  quote: 'お見積りは修正箇所に貼るシールのサイズを計測していただき、サイズ・色数・数量などをお知らせ下さい。テキストだけの修正でしたらワード・エクセルでの入稿でも十分に対応できます。罫線や表の一部を修正したい場合はシールをどのサイズにしたら良いか難しいと思います。被着体となるものの実物サンプルなどお送りいただけましたら、こちらで最適な形状で仕上げます。',
  note: '一時的に隠しておき、再び剥がしたい場合の素材もあります。別途、ご相談ください',
};

// 商品シールの詳細データ
const productSealDetail = {
  subtitle: '用途',
  description: '個人・法人問わず商品のパッケージラベルとしてご利用いただけます。ご利用環境によって素材・加工の選定もご案内いただきます。',
  additionalInfo: 'また食品・各種製品の品名・成分・賞味期限表示や材質・品質表示、取扱説明、パッケージの内容表示、パッキンケースの内容表示など様々な情報表示用途に。',
  examples: [
    '和菓子・洋菓子などの店頭販売商品のラベル',
    '日本酒・ワインなどの飲料系ラベル',
    '農家の方が作る、自家製商品のラベル',
    'シャンプーや化粧品など水場使用が考えられる商品のラベル',
  ],
  materialNote: '素材は商品の使用環境に合わせて紙系・フィルム系を選択します。',
  usages: [
    '賞味・消費期限の表示',
    '商品内容の表示',
    '商品やサービスの説明表示',
    '自社販売製品のカスタマーセンターへの案内表示など',
  ],
  specifications: [
    '糊は貼った後のご利用環境により決定します。',
    'サイズはお客様のご要望に応じたサイズで作成可能です。',
    '色は単色からフルカラーまで対応可能です。「写真が入る」など詳細をお伝え下さい。デザイン確認ができるデータをお持ちの方は圧縮形式ファイルを添付してください。',
    '仕上げ方法は様々です。印刷方法によって仕上げ方法も変わりますので、決まった条件の仕上げがある場合は、事前にお知らせ下さい。',
  ],
};

// 工業用シールの詳細データ
const industrialSealDetail = {
  subtitle: '用途',
  description: '機械・電気関係ならば、製品名を表示したり、配線図や電気回路図、取り扱い説明、取り扱い上の注意情報・警告情報、マニュアル情報など。また、様々な製品の注意情報表示に。製造物責任法（ＰＬ法）に対応したシールも作成可能です。',
  otherUsages: [
    '危険箇所や危険な行動を抑止させたい',
    'トイレ内やオフィス内のマナー向上',
  ],
  materials: '素材は基本的にはフィルム系の素材を使用することが多いです。ユポ、もしくはフィルム（消し銀）などが一般的です。',
  note: '警告や注意を促すもの全般が対象になります。禁煙・駐禁などの一般的なマークをオリジナルで作成するの面白いですね。',
  specialFeature: '「貼った警告・注意銘板を綺麗に剥がしたい」・・・。そんな方には強粘着性・再剥離糊を使った素材があります。',
};

// 両面粘着シールの詳細データ
const doubleSidedSealDetail = {
  subtitle: '規定外サイズの両面粘着シールを作成したい！',
  description: '両面テープを指定のサイズ（例：30mm×40mmなど）にカットすることができます。また、ある程度の変形も可能。',
  details: '写真や紙製品などに粘着材（糊）を塗布して貼りつけるといったわずらわしさや、市販の両面テープを必要な大きさにカットして使うといった面倒な行為から開放されることになります。',
};

// 個人情報保護シールの詳細データ
const privacySealDetail = {
  subtitle: '「返信してもらうときに、お客様の個人情報漏えいが怖い」',
  description: '２００５年４月１日に施行された「個人情報保護法」を受け、企業側での個人情報の機密性、セキュリティー面での信頼性が問われています。',
  details: 'プライバシー保護シールは、アンケート用紙、申込書、応募・懸賞用はがき等、個人情報を記入するさまざまな媒体に目隠しシールとして使用が可能で、セキュリティー強化による顧客信頼度のアップに貢献します。',
};

// 盗撮防止シールの詳細データ
const antiPhotographySealDetail = {
  subtitle: '用途',
  description: 'ラベル貼付時は撮影ができません。また、一度剥がすと文字が現れ元の状態には戻せず、カメラ使用の有無が容易に判別・確認できます。レンズ部分を保護するような構成となっており、粘着糊がレンズ部に付着しないようになっております。',
  useCases: [
    '「社内撮影禁止」の企業様でお客様に徹底したい',
    '美術館など撮影禁止場所での撮影防止を徹底したい',
  ],
  additionalInfo: '「デジタル万引き」という造語まで生んだ、営業権・著作権等の権利・権益の侵犯、またイベント会場その他における肖像権無視の風潮、さらには企業内部・デザイン室・研究室・企画部門・保安軍事・医療等々、機密事項や安全保持を必要とする場所での情報、技術の拡散、流盗用の危惧。',
  note: 'これらの状況に対処する、カメラの撮影機能を一時的に封印する「カメラ付き携帯電話端末、デジカメ等撮影機能一時封印シール」盗撮防止ラベル。',
  salesNote: '◆ネット販売致しております。詳細はお問い合わせフォームよりお問い合わせください。',
};

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const renderDetailContent = () => {
    switch (product.id) {
      case 'seal-closure':
        return (
          <div className="space-y-12">
            <div>
              <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                {sealClosureDetail.description}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                {sealClosureDetail.details}
              </p>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sealClosureDetail.images.map((image, index) => (
                <div key={index} className="aspect-video rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
                  <ImageWithFallback
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

            {/* YouTube Video */}
            <div className="aspect-video rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/CAEhTWBZKHY"
                title="封印シール 使用方法"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        );

      case 'correction-seal':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl text-blue-600 mb-3">{correctionSealDetail.subtitle}</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {correctionSealDetail.description}
              </p>

              <div className="mb-6 p-6 rounded-xl bg-blue-50 border border-blue-100">
                <h4 className="text-gray-900 mb-3">活用例</h4>
                <div className="space-y-2">
                  {correctionSealDetail.useCases.map((useCase, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm leading-relaxed">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6 p-6 rounded-xl bg-gray-50 border border-gray-200">
                <h4 className="text-gray-900 mb-2">素材について</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{correctionSealDetail.materials}</p>
              </div>

              <div className="mb-6 p-6 rounded-xl bg-green-50 border border-green-200">
                <h4 className="text-gray-900 mb-2">お見積りについて</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{correctionSealDetail.quote}</p>
              </div>

              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <p className="text-gray-700 text-sm">{correctionSealDetail.note}</p>
              </div>
            </div>

            <div className="aspect-square rounded-2xl overflow-hidden border border-gray-200 shadow-xl lg:sticky lg:top-24 h-fit">
              <ImageWithFallback
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );

      case 'product-seal':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square rounded-2xl overflow-hidden border border-gray-200 shadow-xl lg:sticky lg:top-24 h-fit">
              <ImageWithFallback
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-xl text-purple-600 mb-3">{productSealDetail.subtitle}</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                {productSealDetail.description}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {productSealDetail.additionalInfo}
              </p>

              <div className="mb-6 p-6 rounded-xl bg-purple-50 border border-purple-100">
                <h4 className="text-gray-900 mb-3">活用例</h4>
                <div className="space-y-2">
                  {productSealDetail.examples.map((example, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm leading-relaxed">{example}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 text-sm mt-4 pt-4 border-t border-purple-200">
                  {productSealDetail.materialNote}
                </p>
              </div>

              <div className="mb-6 p-6 rounded-xl bg-blue-50 border border-blue-100">
                <h4 className="text-gray-900 mb-3">表示内容例</h4>
                <div className="space-y-2">
                  {productSealDetail.usages.map((usage, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm leading-relaxed">{usage}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl bg-gray-50 border border-gray-200">
                <h4 className="text-gray-900 mb-3">仕様について</h4>
                <div className="space-y-2">
                  {productSealDetail.specifications.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm leading-relaxed">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'industrial-seal':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl text-purple-600 mb-3">{industrialSealDetail.subtitle}</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {industrialSealDetail.description}
              </p>

              <div className="mb-6 p-6 rounded-xl bg-purple-50 border border-purple-100">
                <h4 className="text-gray-900 mb-3">上記以外の発想でご利用方法は様々</h4>
                <div className="space-y-2">
                  {industrialSealDetail.otherUsages.map((usage, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm leading-relaxed">{usage}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6 p-6 rounded-xl bg-gray-50 border border-gray-200">
                <h4 className="text-gray-900 mb-2">素材について</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{industrialSealDetail.materials}</p>
              </div>

              <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-gray-700 text-sm">{industrialSealDetail.note}</p>
              </div>

              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <p className="text-gray-700 text-sm">{industrialSealDetail.specialFeature}</p>
              </div>
            </div>

            <div className="aspect-square rounded-2xl overflow-hidden border border-gray-200 shadow-xl lg:sticky lg:top-24 h-fit">
              <ImageWithFallback
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );

      case 'double-sided-seal':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square rounded-2xl overflow-hidden border border-gray-200 shadow-xl lg:sticky lg:top-24 h-fit">
              <ImageWithFallback
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="text-green-600 mb-4">{doubleSidedSealDetail.subtitle}</p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {doubleSidedSealDetail.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {doubleSidedSealDetail.details}
              </p>
            </div>
          </div>
        );

      case 'privacy-seal':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square rounded-2xl overflow-hidden border border-gray-200 shadow-xl lg:sticky lg:top-24 h-fit">
              <ImageWithFallback
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="text-orange-600 mb-4">{privacySealDetail.subtitle}</p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {privacySealDetail.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {privacySealDetail.details}
              </p>
            </div>
          </div>
        );

      case 'anti-photography-seal':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl text-orange-600 mb-3">{antiPhotographySealDetail.subtitle}</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {antiPhotographySealDetail.description}
              </p>

              <div className="mb-6 p-6 rounded-xl bg-orange-50 border border-orange-100">
                <h4 className="text-gray-900 mb-3">活用例</h4>
                <div className="space-y-2">
                  {antiPhotographySealDetail.useCases.map((useCase, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm leading-relaxed">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6 p-6 rounded-xl bg-gray-50 border border-gray-200">
                <h4 className="text-gray-900 mb-2">背景</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{antiPhotographySealDetail.additionalInfo}</p>
              </div>

              <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-gray-700 text-sm">{antiPhotographySealDetail.note}</p>
              </div>

              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <p className="text-gray-700 text-sm">{antiPhotographySealDetail.salesNote}</p>
              </div>
            </div>

            <div className="aspect-square rounded-2xl overflow-hidden border border-gray-200 shadow-xl lg:sticky lg:top-24 h-fit">
              <ImageWithFallback
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-600">詳細情報を準備中です。</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24">
      {/* Breadcrumb */}
      <section className="py-6 px-6 sm:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center gap-3 text-sm">
          <Link to="/products" className="text-gray-600 hover:text-blue-600 transition-colors">
            商品一覧
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            to={`/products/categories/${product.category}`}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            {product.categoryName}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900">{product.title}</span>
        </div>
      </section>

      {/* Header */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">商品一覧に戻る</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm mb-4">
              {product.categoryName}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6">
              {product.title}
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl leading-relaxed">
              {product.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Detail Content */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {renderDetailContent()}
          </motion.div>
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30"
            >
              お問い合わせ
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
