import { RunnerData, RunnerMetrics, OverallMetrics } from './types';

export function calculateOverallMetrics(data: RunnerData[]): OverallMetrics {
  if (data.length === 0) {
    return {
      totalMiles: 0,
      averageMiles: 0,
      minMiles: 0,
      maxMiles: 0,
      totalRuns: 0,
      totalRunners: 0
    };
  }

  const miles = data.map(d => d.milesRun);
  const totalMiles = miles.reduce((sum, m) => sum + m, 0);
  const uniqueRunners = new Set(data.map(d => d.person)).size;

  return {
    totalMiles: Math.round(totalMiles * 100) / 100,
    averageMiles: Math.round((totalMiles / data.length) * 100) / 100,
    minMiles: Math.min(...miles),
    maxMiles: Math.max(...miles),
    totalRuns: data.length,
    totalRunners: uniqueRunners
  };
}

export function calculatePersonMetrics(data: RunnerData[]): RunnerMetrics[] {
  const grouped = data.reduce((acc, run) => {
    if (!acc[run.person]) {
      acc[run.person] = [];
    }
    acc[run.person].push(run.milesRun);
    return acc;
  }, {} as Record<string, number[]>);

  return Object.entries(grouped).map(([person, miles]) => {
    const totalMiles = miles.reduce((sum, m) => sum + m, 0);
    return {
      person,
      totalMiles: Math.round(totalMiles * 100) / 100,
      averageMiles: Math.round((totalMiles / miles.length) * 100) / 100,
      minMiles: Math.min(...miles),
      maxMiles: Math.max(...miles),
      totalRuns: miles.length
    };
  }).sort((a, b) => b.totalMiles - a.totalMiles);
}
