'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, X } from 'lucide-react';
import { CSVError } from '@/lib/types';
import { useState } from 'react';

interface ErrorDisplayProps {
  errors: CSVError[];
}

export function ErrorDisplay({ errors }: ErrorDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (errors.length === 0) return null;

  const displayErrors = isExpanded ? errors : errors.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-4xl mx-auto mt-8"
    >
      <Alert className="bg-medieval-burgundy/20 border-2 border-medieval-burgundy">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
          
          <div className="flex-1">
            <AlertDescription>
              <p className="font-medieval text-medieval-parchment mb-4">
                The scroll contains {errors.length} error{errors.length > 1 ? 's' : ''}:
              </p>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <AnimatePresence>
                  {displayErrors.map((error, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-medieval-darker/50 p-3 rounded border border-medieval-copper/30"
                    >
                      <p className="text-sm text-medieval-parchment">
                        <span className="text-red-400 font-semibold">Row {error.row}:</span>{' '}
                        {error.message}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {errors.length > 3 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-3 text-sm text-medieval-gold hover:text-medieval-glow transition-colors underline"
                >
                  {isExpanded ? 'Show less' : `Show ${errors.length - 3} more errors`}
                </button>
              )}
            </AlertDescription>
          </div>
        </div>
      </Alert>
    </motion.div>
  );
}
