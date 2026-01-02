'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { medievalGlow, fadeInUp } from '@/lib/animations';
import { useEffect, useState } from 'react';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  delay?: number;
}

export function IlluminatedMetricCard({ icon: Icon, label, value, suffix = '', delay = 0 }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeInUp}
      transition={{ delay }}
    >
      <motion.div
        variants={medievalGlow}
        whileHover="hover"
        initial="rest"
      >
        <Card className="relative overflow-hidden bg-medieval-stone border-2 border-medieval-copper p-6 group">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-medieval-gold opacity-50" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-medieval-gold opacity-50" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-medieval-gold opacity-50" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-medieval-gold opacity-50" />

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-medieval-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <motion.div
              className="p-3 rounded-full bg-medieval-darker border border-medieval-gold/30"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Icon className="w-6 h-6 text-medieval-gold" />
            </motion.div>

            <div className="text-center">
              <motion.p className="text-3xl font-medieval text-medieval-parchment mb-1">
                {displayValue.toFixed(value % 1 === 0 ? 0 : 2)}{suffix}
              </motion.p>
              <p className="text-sm text-medieval-gold/70 uppercase tracking-wider">
                {label}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
