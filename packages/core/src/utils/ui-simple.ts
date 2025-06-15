/**
 * @fileoverview Simple UI utilities for core package
 * @description Basic CLI output utilities without complex dependencies
 */

/**
 * Simple console UI utilities
 */
export const ui = {
  success: (title: string, message?: string): void => {
    console.log(`✅ ${title}${message ? `: ${message}` : ''}`);
  },

  error: (title: string, message?: string): void => {
    console.error(`❌ ${title}${message ? `: ${message}` : ''}`);
  },

  info: (title: string, message?: string): void => {
    console.log(`ℹ️  ${title}${message ? `: ${message}` : ''}`);
  },

  startTask: (id: string, message: string): void => {
    console.log(`⏳ ${message}...`);
  },

  completeTask: (id: string, message: string): void => {
    console.log(message);
  },
}; 