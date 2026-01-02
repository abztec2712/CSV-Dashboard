export interface RunnerData {
  date: string;
  person: string;
  milesRun: number;
}

export interface ParsedCSVData {
  data: RunnerData[];
  errors: CSVError[];
}

export interface CSVError {
  row: number;
  field: string;
  message: string;
}

export interface RunnerMetrics {
  person: string;
  totalMiles: number;
  averageMiles: number;
  minMiles: number;
  maxMiles: number;
  totalRuns: number;
}

export interface OverallMetrics {
  totalMiles: number;
  averageMiles: number;
  minMiles: number;
  maxMiles: number;
  totalRuns: number;
  totalRunners: number;
}
