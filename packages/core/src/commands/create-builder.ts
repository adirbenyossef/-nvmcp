/**
 * Create command builder
 * @fileoverview Yargs builder configuration for create command
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import type { Argv } from 'yargs';

/**
 * Configure yargs builder for create command
 * @param yargs - Yargs instance
 * @returns Configured yargs instance
 */
export function buildCreateCommand(yargs: Argv): Argv {
  return yargs
    .positional('name', {
      describe: 'Name of the workspace to create',
      type: 'string',
      demandOption: true,
    })
    .option('template', {
      alias: 't',
      describe: 'Template to use for workspace creation',
      type: 'string',
      default: 'basic',
      choices: ['basic', 'full', 'minimal', 'custom'],
    });
} 