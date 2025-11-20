import { motion } from 'motion/react';
import logoImage from '../assets/daiko-logo.png';

interface LogoBrandProps {
  layoutId?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export function LogoBrand({ layoutId, className = '', size = 'medium' }: LogoBrandProps) {
  const sizeClasses = {
    small: 'w-32 sm:w-40',
    medium: 'w-64 md:w-96',
    large: 'w-80 md:w-[600px]',
  };

  return (
    <motion.img
      layoutId={layoutId}
      src={logoImage}
      alt="株式会社 大幸"
      className={`${sizeClasses[size]} h-auto object-contain ${className}`}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  );
}
