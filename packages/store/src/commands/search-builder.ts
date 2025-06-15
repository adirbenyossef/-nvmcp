/**
 * Search command builder
 * @fileoverview Yargs builder configuration for search command
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import type { Argv } from 'yargs';

/**
 * Configure yargs builder for search command
 * @param yargs - Yargs instance
 * @returns Configured yargs instance
 */
export function buildSearchCommand(yargs: Argv): Argv {
  return yargs
    .positional('query', {
      type: 'string',
      describe: 'Search query',
      demandOption: true,
    })
    .option('limit', {
      type: 'number',
      default: 10,
      describe: 'Maximum number of results to show',
    });
} 