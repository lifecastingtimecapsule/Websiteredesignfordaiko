import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export function ModernFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-800 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 py-4 sm:py-6">
        <div className="space-y-3 mb-4">
          {/* 会社情報 */}
          <div className="border-b border-slate-700 pb-2">
            <h3 className="text-base mb-1">株式会社大幸</h3>
            <p className="text-slate-300 text-xs">
              1982年創業 | シール・ラベル印刷専門会社
            </p>
          </div>

          {/* メニュー */}
          <div className="grid grid-cols-2 gap-4">
            {/* サービス */}
            <div>
              <h3 className="text-xs mb-1.5 text-slate-400">サービス</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                <Link to="/order" onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors">
                  注文
                </Link>
                <Link to="/products" onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors">
                  商品案内
                </Link>
                <Link to="/sdgs" onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors">
                  SDGs
                </Link>
              </div>
            </div>

            {/* 企業情報 */}
            <div>
              <h3 className="text-xs mb-1.5 text-slate-400">企業情報</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                <Link to="/company" onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors">
                  会社情報
                </Link>
                <Link to="/recruitment" onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors">
                  採用情報
                </Link>
                <Link to="/news" onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors">
                  ニュース
                </Link>
              </div>
            </div>
          </div>

          {/* お問い合わせ */}
          <div>
            <h3 className="text-xs mb-1.5 text-slate-400">お問い合わせ</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Phone className="w-3 h-3 flex-shrink-0" />
                <span>052-903-8273</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Mail className="w-3 h-3 flex-shrink-0" />
                <a href="mailto:daikoinfo@daiko-lsf.jp" className="hover:text-white transition-colors">
                  daikoinfo@daiko-lsf.jp
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <a 
                  href="https://www.google.com/maps/place/%E3%80%92462-0034+%E6%84%9B%E7%9F%A5%E7%9C%8C%E5%90%8D%E5%8F%A4%E5%B1%8B%E5%B8%82%E5%8C%97%E5%8C%BA%E5%A4%A9%E9%81%93%E7%94%BA%EF%BC%94%E4%B8%81%E7%9B%AE%EF%BC%91%EF%BC%91/@35.2062139,136.9182509,16z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  名古屋市北区天道町4丁目11
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-3">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-slate-400 text-xs">
              &copy; 2025 株式会社大幸. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs">
              <Link to="/" onClick={scrollToTop} className="text-slate-400 hover:text-white transition-colors">
                ホーム
              </Link>
              <Link to="/contact" onClick={scrollToTop} className="text-slate-400 hover:text-white transition-colors">
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}