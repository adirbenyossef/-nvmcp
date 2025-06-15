/**
 * Logger symbols and formatting
 * @fileoverview Visual symbols and colors for logger output
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import chalk from 'chalk';

/**
 * Log level symbols with Turbo/pnpm inspired styling
 */
export const logSymbols = {
  info: chalk.blue('●'),
  warn: chalk.yellow('▲'),
  error: chalk.red('✖'),
  fatal: chalk.red('💥'),
  debug: chalk.gray('◦'),
  success: chalk.green('✓'),
  step: chalk.cyan('→'),
  progress: chalk.magenta('◐'),
} as const;

/**
 * Format timestamp for log messages
 * @returns Formatted timestamp string
 */
export function formatTimestamp(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
} 