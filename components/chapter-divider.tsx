'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

interface ChapterDividerProps {
  chapter: string;
  title: string;
}

export function ChapterDivider({ chapter, title }: ChapterDividerProps) {
  return (
    <motion.div
      className="relative py-20 flex flex-col items-center justify-center"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUp}
    >
      {/* Decorative line */}
      <div className="w-64 h-px bg-gradient-to-r from-transparent via-medieval-gold to-transparent mb-6" />
      
      {/* Chapter number */}
      <motion.p
        className="text-medieval-gold text-sm tracking-[0.3em] uppercase mb-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {chapter}
      </motion.p>
      
      {/* Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-medieval text-medieval-parchment text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.h2>
      
      {/* Decorative ornament */}
      <motion.div
        className="text-medieval-gold text-2xl"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        ❦
      </motion.div>
      
      {/* Bottom line */}
      <div className="w-64 h-px bg-gradient-to-r from-transparent via-medieval-gold to-transparent mt-6" />
    </motion.div>
  );
}
