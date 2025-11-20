import { motion } from 'motion/react';
import logoImage from 'figma:asset/e229fc8a86a6e7fa02a1789651d2edf9a0bb52dc.png';

interface LogoBrandProps {
  layoutId?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export function LogoBrand({ layoutId, className = '', size = 'medium' }: LogoBrandProps) {
  const sizeClasses = {
    small: 'w-32 sm:w-40',
    medium: 'w-48 md:w-64',
    large: 'w-64 md:w-96',
  };

  return (
    <motion.img
      layoutId={layoutId}
      src={logoImage}
      alt="株式会社 大幸 DAIKO"
      className={`${sizeClasses[size]} h-auto object-contain ${className}`}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  );
}