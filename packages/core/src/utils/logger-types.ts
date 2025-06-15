/**
 * Logger types and interfaces
 * @fileoverview Type definitions for the NVMCP logger system
 * @author NVMCP Contributors
 * @since 0.1.0
 */

/**
 * Logger interface with various log levels
 */
export interface Logger {
  info: (message: string, ...args: unknown[]) => void;
  warn: (message: string, ...args: unknown[]) => void;
  error: (message: string, ...args: unknown[]) => void;
  fatal: (message: string, ...args: unknown[]) => void;
  debug: (message: string, ...args: unknown[]) => void;
  success: (message: string, ...args: unknown[]) => void;
  step: (message: string, ...args: unknown[]) => void;
  progress: (message: string, duration?: number) => void;
}

/**
 * Logger configuration options
 */
export interface LoggerOptions {
  verbose?: boolean;
  quiet?: boolean;
} 