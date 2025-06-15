/**
 * Logger implementation
 * @fileoverview Main logger factory and implementation
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import chalk from 'chalk';
import type { Logger, LoggerOptions } from './logger-types.js';
import { logSymbols, formatTimestamp } from './logger-symbols.js';

/**
 * Create a logger instance with specified options
 * @param options - Logger configuration options
 * @returns Configured logger instance
 */
export function createLogger(options: LoggerOptions = {}): Logger {
  const { verbose = false, quiet = false } = options;

  const formatMessage = (symbol: string, message: string, ...args: unknown[]): string => {
    const timestamp = chalk.gray(`[${formatTimestamp()}]`);
    const argsText = args.length > 0 
      ? ` ${args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ')}`
      : '';
    return `${timestamp} ${symbol} ${message}${argsText}`;
  };

  const log = (level: keyof typeof logSymbols, message: string, ...args: unknown[]) => {
    if (quiet && level !== 'error' && level !== 'fatal') return;
    if (!verbose && level === 'debug') return;
    
    const formatted = formatMessage(logSymbols[level], message, ...args);
    const output = level === 'error' || level === 'fatal' ? process.stderr : process.stdout;
    output.write(formatted + '\n');
  };

  return {
    info: (message, ...args) => log('info', message, ...args),
    warn: (message, ...args) => log('warn', message, ...args),
    error: (message, ...args) => log('error', message, ...args),
    fatal: (message, ...args) => log('fatal', message, ...args),
    debug: (message, ...args) => log('debug', message, ...args),
    success: (message, ...args) => log('success', message, ...args),
    step: (message, ...args) => log('step', message, ...args),
    progress: (message, duration) => {
      const durationText = duration ? chalk.gray(`(${Math.round(duration)}ms)`) : '';
      log('progress', `${message} ${durationText}`);
    },
  };
} 