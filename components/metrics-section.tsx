'use client';

import { TrendingUp, TrendingDown, Target, Users, Footprints } from 'lucide-react';
import { IlluminatedMetricCard } from './illuminated-metrics';
import { OverallMetrics } from '@/lib/types';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/animations';

interface MetricsSectionProps {
  metrics: OverallMetrics;
}

export function MetricsSection({ metrics }: MetricsSectionProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <IlluminatedMetricCard
        icon={Footprints}
        label="Total Miles"
        value={metrics.totalMiles}
        suffix=" mi"
        delay={0}
      />
      <IlluminatedMetricCard
        icon={Target}
        label="Average Miles"
        value={metrics.averageMiles}
        suffix=" mi"
        delay={0.1}
      />
      <IlluminatedMetricCard
        icon={TrendingUp}
        label="Maximum Miles"
        value={metrics.maxMiles}
        suffix=" mi"
        delay={0.2}
      />
      <IlluminatedMetricCard
        icon={TrendingDown}
        label="Minimum Miles"
        value={metrics.minMiles}
        suffix=" mi"
        delay={0.3}
      />
      <IlluminatedMetricCard
        icon={Footprints}
        label="Total Runs"
        value={metrics.totalRuns}
        delay={0.4}
      />
      <IlluminatedMetricCard
        icon={Users}
        label="Total Runners"
        value={metrics.totalRunners}
        delay={0.5}
      />
    </motion.div>
  );
}

