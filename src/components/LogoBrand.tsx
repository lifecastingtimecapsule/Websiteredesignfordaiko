import { motion } from 'motion/react';

interface LogoBrandProps {
  layoutId?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export function LogoBrand({ layoutId, className = '', size = 'medium' }: LogoBrandProps) {
  const sizeClasses = {
    small: 'text-2xl sm:text-3xl',
    medium: 'text-6xl md:text-8xl',
    large: 'text-8xl md:text-9xl',
  };

  return (
    <motion.div
      layoutId={layoutId}
      className={`flex flex-col items-center justify-center ${className}`}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* メインロゴ: DAIKO */}
      <div className={`${sizeClasses[size]} font-bold tracking-tight mb-2`}>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-sky-600 to-emerald-600">
          DAIKO
        </span>
      </div>
      
      {/* サブテキスト: 株式会社大幸 */}
      {(size === 'medium' || size === 'large') && (
        <div className="text-sm md:text-base text-slate-600 tracking-widest font-medium">
          株式会社大幸
        </div>
      )}
    </motion.div>
  );
}
