'use client';

import { useTransform, useScroll, MotionValue } from 'framer-motion';

export function useParallax(distance: number = 50): MotionValue<number> {
  const { scrollY } = useScroll();
  return useTransform(scrollY, [0, 1000], [0, distance]);
}
