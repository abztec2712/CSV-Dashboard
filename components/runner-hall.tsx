'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { RunnerMetrics } from '@/lib/types';
import { Crown, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';

interface RunnerHallProps {
  metrics: RunnerMetrics[];
  selectedPerson: string | undefined;
  onSelectPerson: (person: string | undefined) => void;
}

export function RunnerHall({ metrics, selectedPerson, onSelectPerson }: RunnerHallProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {/* All Runners Card */}
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card
            className={`
              cursor-pointer p-6 transition-all duration-300
              ${selectedPerson === undefined
                ? 'bg-medieval-gold/20 border-2 border-medieval-gold shadow-lg shadow-medieval-gold/30'
                : 'bg-medieval-stone border-2 border-medieval-copper hover:border-medieval-gold'
              }
            `}
            onClick={() => onSelectPerson(undefined)}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-full bg-medieval-darker border-2 border-medieval-gold">
                <Crown className="w-8 h-8 text-medieval-gold" />
              </div>
              <h3 className="text-xl font-medieval text-medieval-parchment">
                All Runners
              </h3>
              <p className="text-sm text-medieval-gold/70">
                View the complete chronicle
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Individual Runner Cards */}
        {metrics.map((runner, index) => (
          <motion.div
            key={runner.person}
            variants={fadeInUp}
            custom={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`
                cursor-pointer p-6 transition-all duration-300 relative overflow-hidden
                ${selectedPerson === runner.person
                  ? 'bg-medieval-gold/20 border-2 border-medieval-gold shadow-lg shadow-medieval-gold/30'
                  : 'bg-medieval-stone border-2 border-medieval-copper hover:border-medieval-gold'
                }
              `}
              onClick={() => onSelectPerson(runner.person)}
            >
              {/* Rank badge for top 3 */}
              {index < 3 && (
                <div className="absolute top-2 right-2">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-medieval text-sm
                    ${index === 0 ? 'bg-yellow-600/80 text-white' : ''}
                    ${index === 1 ? 'bg-gray-400/80 text-white' : ''}
                    ${index === 2 ? 'bg-amber-700/80 text-white' : ''}
                  `}>
                    {index + 1}
                  </div>
                </div>
              )}

              <div className="flex flex-col space-y-4">
                <h3 className="text-xl font-medieval text-medieval-parchment pr-10">
                  {runner.person}
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-medieval-gold/70 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Total
                    </span>
                    <span className="text-medieval-parchment font-semibold">
                      {runner.totalMiles} mi
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-medieval-gold/70 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Max
                    </span>
                    <span className="text-medieval-parchment">
                      {runner.maxMiles} mi
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-medieval-gold/70 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4" />
                      Min
                    </span>
                    <span className="text-medieval-parchment">
                      {runner.minMiles} mi
                    </span>
                  </div>

                  <div className="pt-2 border-t border-medieval-copper/30">
                    <div className="flex justify-between items-center">
                      <span className="text-medieval-gold/70">Runs</span>
                      <span className="text-medieval-parchment font-semibold">
                        {runner.totalRuns}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
