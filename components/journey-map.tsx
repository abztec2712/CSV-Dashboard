'use client';

import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { RunnerData } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { fadeInUp } from '@/lib/animations';

interface JourneyMapProps {
  data: RunnerData[];
  selectedPerson?: string;
}

export function JourneyMap({ data, selectedPerson }: JourneyMapProps) {
  // Prepare chart data
  const chartData = data
    .filter(d => !selectedPerson || d.person === selectedPerson)
    .map(d => ({
      date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      miles: d.milesRun,
      person: d.person,
    }));

  // Group by person for multiple lines
  const groupedByPerson = data.reduce((acc, run) => {
    if (!selectedPerson || run.person === selectedPerson) {
      if (!acc[run.person]) {
        acc[run.person] = [];
      }
      acc[run.person].push({
        date: new Date(run.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        miles: run.milesRun,
      });
    }
    return acc;
  }, {} as Record<string, { date: string; miles: number }[]>);

  // Combine all dates
  const allDates = Array.from(new Set(chartData.map(d => d.date)));
  const combinedData = allDates.map(date => {
    const entry: any = { date };
    Object.keys(groupedByPerson).forEach(person => {
      const run = groupedByPerson[person].find(r => r.date === date);
      entry[person] = run ? run.miles : null;
    });
    return entry;
  });

  const colors = ['#8b7355', '#d4c5a9', '#ffd89b', '#5c1a1a', '#6b4423'];

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUp}
    >
      <Card className="bg-medieval-stone/50 border-2 border-medieval-copper p-6 backdrop-blur-sm">
        {/* Decorative header */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-medieval-gold to-transparent" />
          <h3 className="px-4 text-xl font-medieval text-medieval-parchment">
            {selectedPerson ? `${selectedPerson}'s Journey` : 'The Grand Journey'}
          </h3>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-medieval-gold to-transparent" />
        </div>

        {/* Chart */}
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedData}>
              <defs>
                {Object.keys(groupedByPerson).map((person, i) => (
                  <linearGradient key={person} id={`gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors[i % colors.length]} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={colors[i % colors.length]} stopOpacity={0.2}/>
                  </linearGradient>
                ))}
              </defs>
              
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(139, 115, 85, 0.2)"
                vertical={false}
              />
              
              <XAxis 
                dataKey="date" 
                stroke="#8b7355"
                style={{ fontSize: '12px', fontFamily: 'Crimson Text' }}
              />
              
              <YAxis 
                stroke="#8b7355"
                style={{ fontSize: '12px', fontFamily: 'Crimson Text' }}
                label={{ 
                  value: 'Miles', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fill: '#8b7355', fontFamily: 'Crimson Text' }
                }}
              />
              
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#2a2520',
                  border: '2px solid #6b4423',
                  borderRadius: '8px',
                  color: '#d4c5a9',
                  fontFamily: 'Crimson Text'
                }}
                labelStyle={{ color: '#8b7355' }}
              />
              
              <Legend 
                wrapperStyle={{
                  fontFamily: 'Crimson Text',
                  color: '#d4c5a9'
                }}
              />

              {Object.keys(groupedByPerson).map((person, i) => (
                <Line
                  key={person}
                  type="monotone"
                  dataKey={person}
                  stroke={colors[i % colors.length]}
                  strokeWidth={3}
                  dot={{ fill: colors[i % colors.length], r: 5 }}
                  activeDot={{ r: 8 }}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}
