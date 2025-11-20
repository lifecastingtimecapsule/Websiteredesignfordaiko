import image_30d6e62090bbab6645f1a7e4abf9fd1d4507de6b from 'figma:asset/30d6e62090bbab6645f1a7e4abf9fd1d4507de6b.png';
import image_5bcdb127ab18f21100e9dbefb57a811237e74022 from 'figma:asset/5bcdb127ab18f21100e9dbefb57a811237e74022.png';
import image_f0073d51b06e2e4ba7a937584237f57ab73c29b2 from 'figma:asset/f0073d51b06e2e4ba7a937584237f57ab73c29b2.png';
import image_0321b6cc94b64ebe0c6d6945af7427c0b691c1fc from 'figma:asset/0321b6cc94b64ebe0c6d6945af7427c0b691c1fc.png';
import image_49fceb223ebf02cf545672618ed2bbf6d6fedf90 from 'figma:asset/49fceb223ebf02cf545672618ed2bbf6d6fedf90.png';
import image_16c9ec2e6e5892537d303e5189ed8a1c9fb6cb50 from 'figma:asset/16c9ec2e6e5892537d303e5189ed8a1c9fb6cb50.png';
import image_01f8fddea3613bbd41a9f34d12d97ca969c049f0 from 'figma:asset/01f8fddea3613bbd41a9f34d12d97ca969c049f0.png';
export type Product = {
  id: string;
  title: string;
  subtitle?: string;
  category: 'easy-to-use' | 'unique-solution' | 'standard' | 'solutions';
  categoryName: string;
  description: string;
  image: string;
};

export const products: Product[] = [
  {
    id: 'seal-closure',
    title: '封印シール',
    category: 'easy-to-use',
    categoryName: '使いやすさ抜群',
    description: '糊やテープを使わず、簡単に封印することができ、またハサミなどを使わず、簡単に開封することができます。',
    image: image_01f8fddea3613bbd41a9f34d12d97ca969c049f0,
  },
  {
    id: 'correction-seal',
    title: '訂正シール',
    category: 'easy-to-use',
    categoryName: '使いやすさ抜群',
    description: '社名・住所変更や、カタログ・パンフレットの内容変更、印刷ミスの修正などに使用できます。',
    image: image_16c9ec2e6e5892537d303e5189ed8a1c9fb6cb50,
  },
  {
    id: 'product-seal',
    title: '商品シール',
    category: 'unique-solution',
    categoryName: '他とは違う対応で',
    description: '個人・法人問わず商品のパッケージラベルとしてご利用いただけます。ご利用環境によって素材・加工の選定もご案内いただきます。',
    image: image_49fceb223ebf02cf545672618ed2bbf6d6fedf90,
  },
  {
    id: 'industrial-seal',
    title: '工業用シール',
    category: 'unique-solution',
    categoryName: '他とは違う対応で',
    description: '機械・電気製品、各種物品についての警告・注意情報の表示に。製造物責任法（ＰＬ法）に対応したシールも作成可能です。',
    image: image_0321b6cc94b64ebe0c6d6945af7427c0b691c1fc,
  },
  {
    id: 'double-sided-seal',
    title: '両面粘着シール',
    category: 'standard',
    categoryName: '一般商品',
    description: '両面テープを指定のサイズにカットすることができます。また、ある程度の変形も可能。',
    image: image_f0073d51b06e2e4ba7a937584237f57ab73c29b2,
  },
  {
    id: 'privacy-seal',
    title: '個人情報保護シール',
    category: 'solutions',
    categoryName: 'お悩み商品解決',
    description: 'プライバシー保護シールは、アンケート用紙、申込書、応募・懸賞用はがき等、個人情報を記入するさまざまな媒体に目隠しシールとして使用が可能です。',
    image: image_5bcdb127ab18f21100e9dbefb57a811237e74022,
  },
  {
    id: 'anti-photography-seal',
    title: '盗撮防止シール',
    category: 'solutions',
    categoryName: 'お悩み商品解決',
    description: 'ラベル貼付時は撮影ができません。また、一度剥がすと文字が現れ元の状態には戻せず、カメラ使用の有無が容易に判別・確認できます。',
    image: image_30d6e62090bbab6645f1a7e4abf9fd1d4507de6b,
  },
];

export const categories = [
  {
    id: 'easy-to-use',
    title: '使いやすさ抜群',
    description: 'デジタル印刷技術を駆使した、誰でも簡単に使える高品質な製品',
    color: 'blue',
  },
  {
    id: 'unique-solution',
    title: '他とは違う対応で',
    description: '特殊なご要望にもお応えする、カスタマイズ性の高いソリューション',
    color: 'purple',
  },
  {
    id: 'standard',
    title: '一般商品',
    description: '日常的にご利用いただける、スタンダードで信頼性の高い製品',
    color: 'green',
  },
  {
    id: 'solutions',
    title: 'お悩み商品解決',
    description: '特殊な課題やお悩みを解決する、専門性の高い製品',
    color: 'orange',
  },
];
