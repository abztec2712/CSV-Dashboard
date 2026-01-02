import Papa from 'papaparse';
import { ParsedCSVData, RunnerData, CSVError } from './types';

export function parseCSV(file: File): Promise<ParsedCSVData> {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const errors: CSVError[] = [];
        const validData: RunnerData[] = [];

        // Check headers
        const headers = results.meta.fields || [];
        const requiredHeaders = ['date', 'person', 'miles run'];
        const hasAllHeaders = requiredHeaders.every(h => 
          headers.some(header => header.toLowerCase().trim() === h)
        );

        if (!hasAllHeaders) {
          errors.push({
            row: 0,
            field: 'headers',
            message: `Missing required columns. Expected: ${requiredHeaders.join(', ')}`
          });
          resolve({ data: [], errors });
          return;
        }

        // Validate each row
        results.data.forEach((row: any, index: number) => {
          const rowErrors: string[] = [];
          
          // Check date
          if (!row.date || row.date.trim() === '') {
            rowErrors.push('Missing date');
          } else {
            const date = new Date(row.date);
            if (isNaN(date.getTime())) {
              rowErrors.push('Invalid date format');
            }
          }

          // Check person
          if (!row.person || row.person.trim() === '') {
            rowErrors.push('Missing person name');
          }

          // Check miles
          const milesField = row['miles run'] || row['miles_run'] || row.miles;
          if (!milesField || milesField.toString().trim() === '') {
            rowErrors.push('Missing miles run');
          } else {
            const miles = parseFloat(milesField);
            if (isNaN(miles)) {
              rowErrors.push('Miles must be a number');
            } else if (miles < 0) {
              rowErrors.push('Miles cannot be negative');
            } else {
              // Valid row
              validData.push({
                date: row.date.trim(),
                person: row.person.trim(),
                milesRun: miles
              });
            }
          }

          // Add errors for this row
          if (rowErrors.length > 0) {
            rowErrors.forEach(errMsg => {
              errors.push({
                row: index + 2, // +2 because index starts at 0 and header is row 1
                field: 'validation',
                message: errMsg
              });
            });
          }
        });

        resolve({ data: validData, errors });
      },
      error: (error) => {
        resolve({
          data: [],
          errors: [{
            row: 0,
            field: 'parse',
            message: `Failed to parse CSV: ${error.message}`
          }]
        });
      }
    });
  });
}
