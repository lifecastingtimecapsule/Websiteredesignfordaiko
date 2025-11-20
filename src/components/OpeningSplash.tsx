import { motion } from 'motion/react';
import logoImage from '../assets/daiko-logo.png';

export function OpeningSplash({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: 'none' }}
      transition={{ duration: 0.5, delay: 1.5 }}
      onAnimationComplete={onComplete}
    >
      <div className="relative w-64 md:w-96">
        <motion.img
          src={logoImage}
          alt="DAIKO"
          className="w-full h-auto object-contain"
          layoutId="daiko-brand-logo"
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </motion.div>
  );
}
