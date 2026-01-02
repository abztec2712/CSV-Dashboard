'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FloatingParticles } from '@/components/floating-particles';
import { ChapterDivider } from '@/components/chapter-divider';
import { ScrollCeremony } from '@/components/scroll-ceremony';
import { MetricsSection } from '@/components/metrics-section';
import { JourneyMap } from '@/components/journey-map';
import { RunnerHall } from '@/components/runner-hall';
import { ErrorDisplay } from '@/components/error-display';
import { ParsedCSVData, RunnerData } from '@/lib/types';
import { calculateOverallMetrics, calculatePersonMetrics } from '@/lib/metrics';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { Scroll } from 'lucide-react';

export default function Home() {
  const [parsedData, setParsedData] = useState<ParsedCSVData | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<string | undefined>(undefined);
  const scrollProgress = useScrollProgress();

  const hasData = parsedData && parsedData.data.length > 0;
  const overallMetrics = hasData ? calculateOverallMetrics(parsedData.data) : null;
  const personMetrics = hasData ? calculatePersonMetrics(parsedData.data) : null;

  return (
    <main className="min-h-screen relative">
      {/* Background particles */}
      <FloatingParticles />

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-medieval-gold origin-left z-50"
        style={{ scaleX: scrollProgress / 100 }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Scroll className="w-16 h-16 text-medieval-gold mx-auto" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-medieval text-medieval-parchment mb-6">
            The Runner's Chronicle
          </h1>
          
          <p className="text-xl md:text-2xl text-medieval-gold/80 max-w-2xl mx-auto leading-relaxed">
            An ancient ledger documenting the journeys of noble runners across time and distance
          </p>

          <motion.div
            className="mt-8 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-medieval-gold" />
            <span className="text-medieval-gold text-sm tracking-widest">❦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-medieval-gold" />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-medieval-gold/50 text-sm mb-2">Scroll to begin</p>
          <div className="w-6 h-10 border-2 border-medieval-gold/50 rounded-full mx-auto flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-medieval-gold rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Chapter I: Upload */}
      <section className="relative py-20 px-4">
        <ChapterDivider chapter="Chapter I" title="The Scroll Ceremony" />
        
        <div className="mt-16">
          <ScrollCeremony onDataParsed={setParsedData} />
        </div>

        {/* Display errors if any */}
        {parsedData && parsedData.errors.length > 0 && (
          <ErrorDisplay errors={parsedData.errors} />
        )}
      </section>

      {/* Chapter II: Overall Metrics */}
      {hasData && overallMetrics && (
        <section className="relative py-20 px-4">
          <ChapterDivider chapter="Chapter II" title="The Grand Ledger" />
          
          <div className="mt-16">
            <MetricsSection metrics={overallMetrics} />
          </div>
        </section>
      )}

      {/* Chapter III: Runner Selection */}
      {hasData && personMetrics && (
        <section className="relative py-20 px-4">
          <ChapterDivider chapter="Chapter III" title="Hall of Champions" />
          
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <RunnerHall
              metrics={personMetrics}
              selectedPerson={selectedPerson}
              onSelectPerson={setSelectedPerson}
            />
          </motion.div>
        </section>
      )}

      {/* Chapter IV: Journey Map */}
      {hasData && (
        <section className="relative py-20 px-4">
          <ChapterDivider chapter="Chapter IV" title="The Journey Maps" />
          
          <div className="mt-16 max-w-6xl mx-auto">
            <JourneyMap data={parsedData.data} selectedPerson={selectedPerson} />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-medieval-copper/30">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-medieval-gold" />
            <span className="text-medieval-gold text-sm">❦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-medieval-gold" />
          </div>
          
          <p className="text-medieval-gold/60 text-sm">
            Crafted in the ancient ways • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  );
}
