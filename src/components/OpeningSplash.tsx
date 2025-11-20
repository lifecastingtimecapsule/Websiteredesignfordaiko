import { motion } from 'motion/react';
import { LogoBrand } from './LogoBrand';

export function OpeningSplash({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: 'none' }}
      transition={{ duration: 0.5, delay: 1.5 }}
      onAnimationComplete={onComplete}
    >
      <div className="relative w-full max-w-2xl px-8">
        <LogoBrand layoutId="daiko-brand-logo" size="large" />
      </div>
    </motion.div>
  );
}
