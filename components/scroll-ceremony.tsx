'use client';

import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, AlertCircle, CheckCircle2, Scroll } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { parseCSV } from '@/lib/csv-parser';
import { ParsedCSVData } from '@/lib/types';
import { medievalGlow } from '@/lib/animations';

interface ScrollCeremonyProps {
  onDataParsed: (data: ParsedCSVData) => void;
}

export function ScrollCeremony({ onDataParsed }: ScrollCeremonyProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFile = useCallback(async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      setUploadStatus('error');
      onDataParsed({ data: [], errors: [{ row: 0, field: 'file', message: 'Only CSV files are accepted' }] });
      return;
    }

    setIsProcessing(true);
    setUploadStatus('idle');

    try {
      const result = await parseCSV(file);
      setUploadStatus(result.errors.length === 0 ? 'success' : 'error');
      onDataParsed(result);
    } catch (error) {
      setUploadStatus('error');
      onDataParsed({ 
        data: [], 
        errors: [{ row: 0, field: 'parse', message: 'Failed to process file' }] 
      });
    } finally {
      setIsProcessing(false);
    }
  }, [onDataParsed]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Upload Area */}
      <motion.div
        className={`
          relative border-2 border-dashed rounded-lg p-12
          transition-all duration-300 cursor-pointer overflow-hidden
          ${isDragging 
            ? 'border-medieval-gold bg-medieval-gold/10 scale-105' 
            : 'border-medieval-copper bg-medieval-stone/50 hover:bg-medieval-stone'
          }
        `}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        variants={medievalGlow}
        whileHover="hover"
        initial="rest"
      >
        {/* Parchment texture overlay */}
        <div 
        className="absolute inset-0 opacity-20 pointer-events-none bg-repeat"
        style={{
            backgroundImage: 'url(/textures/parchment.png)',
            backgroundSize: '200px 200px',
            }}/>

        <div className="relative z-0 flex flex-col items-center justify-center space-y-4">
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ rotate: { duration: 2, repeat: Infinity, ease: 'linear' } }}
              >
                <Scroll className="w-16 h-16 text-medieval-gold" />
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative"
              >
                <Upload className="w-16 h-16 text-medieval-gold animate-float" />
                {isDragging && (
                  <motion.div
                    className="absolute inset-0 -m-4 border-2 border-medieval-gold rounded-full"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center space-y-2">
            <p className="text-xl font-medieval text-medieval-parchment">
              {isProcessing ? 'The Scribes Are Recording...' : 'Place Your Scroll Upon the Altar'}
            </p>
            <p className="text-sm text-medieval-gold/70">
              {isDragging ? 'Release to commence the ceremony' : 'Drop CSV file or click to select'}
            </p>
          </div>

          {/* Format requirements */}
          <div className="text-xs text-medieval-parchment/60 text-center max-w-md">
            <p className="font-medieval mb-1">Required Scroll Format:</p>
            <code className="bg-medieval-darker/50 px-2 py-1 rounded">
              date, person, miles run
            </code>
          </div>
        </div>
      </motion.div>

      {/* Status Messages */}
      <AnimatePresence>
        {uploadStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4"
          >
            <Alert className="border-medieval-gold bg-medieval-gold/10">
              <CheckCircle2 className="h-4 w-4 text-medieval-gold" />
              <AlertDescription className="text-medieval-parchment">
                The scroll has been accepted! The chronicle unfolds below.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {uploadStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4"
          >
            <Alert className="border-medieval-burgundy bg-medieval-burgundy/10">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-medieval-parchment">
                The scroll bears errors. Review the warnings below.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
